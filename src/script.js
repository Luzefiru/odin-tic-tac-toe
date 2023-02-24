function Position(x, y) {
  return { x, y };
}

const boardModule = (function boardModel() {
  // board[row][col]
  let board = [
    ['O', 'O', 'X'],
    ['O', '', 'O'],
    ['', 'O', 'X'],
  ];

  /**
   * Plays a single turn given a Position object & string symbol to insert in a cell
   * @param {Position} position - the cell of the board to insert {symbol} in, Zero-based
   * @param {String} symbol - the character symbol (either 'O' or 'X') to insert to the cell
   */
  function playTurn(position, symbol) {
    const { x, y } = position;
    board[x][y] = symbol;
  }
  /**
   * Resets the board and sets each cell to be empty strings {''}
   */
  function newGame() {
    board = board.map(() => ['', '', '']);
  }
  /**
   * Checks if {symbol}'s player won the game.
   * @param {String} symbol - the character symbol (either 'O' or 'X') of the player to check
   * @returns {Boolean} - the verdict of whether {symbol}'s player won
   */
  function isWinner(symbol) {
    let noMatch = true;

    /* checks for 3-matching rows */
    for (let row = 0; row < board.length; row += 1) {
      const matches = [];
      for (let col = 0; col < board[row].length; col += 1) {
        if (board[row][col] === symbol) {
          matches.push(true);
        } else {
          matches.push(false);
        }
      }

      // if there is a mismatch in the row, then noMatch holds true
      if (matches.find((bool) => bool === false) !== undefined) {
        noMatch = true;
      } else {
        noMatch = false;
      }
    }
    /* checks for 3-matching columns */
    if (noMatch) {
      for (let col = 0; col < board.length; col += 1) {
        const matches = [];
        for (let row = 0; row < board[col].length; row += 1) {
          if (board[row][col] === symbol) {
            matches.push(true);
          } else {
            matches.push(false);
          }
        }
        // if there is a mismatch in the column, then noMatch holds true
        if (matches.find((bool) => bool === false) !== undefined) {
          noMatch = true;
        } else {
          noMatch = false;
        }
      }
    }
    /* checks for top-left to bottom-right diagonal matches */
    if (noMatch) {
      const matches = [];
      for (let colrow = 0; colrow < board.length; colrow += 1) {
        matches.push(board[colrow][colrow] === symbol);
      }
      if (matches.find((bool) => bool === false) !== undefined) {
        noMatch = true;
      } else {
        noMatch = false;
      }
    }
    /* checks for top-right to bottom-left diagonal matches */
    if (noMatch) {
      const matches = [];
      for (let row = 0, col = 2; row < board.length; row += 1, col -= 1) {
        matches.push(board[row][col] === symbol);
      }
      if (matches.find((bool) => bool === false) !== undefined) {
        noMatch = true;
      } else {
        noMatch = false;
      }
    }

    // if noMatch is true, then {symbol} did not win, otherwise {symbol} wins
    return !noMatch;
  }
  /**
   * Getter function to return the current board state for DOM Rendering
   * @returns {Array} the current board state
   */
  function getBoard() {
    return board;
  }

  return {
    playTurn, newGame, isWinner, getBoard,
  };
})();

const displayEngine = (function display() {
  const cellNodeList = document.querySelectorAll('.board__cell');
  const cellNumberToPosition = {
    0: Position(0, 0),
    1: Position(0, 1),
    2: Position(0, 2),
    3: Position(1, 0),
    4: Position(1, 1),
    5: Position(1, 2),
    6: Position(2, 0),
    7: Position(2, 1),
    8: Position(2, 2),
  };

  function renderBoard() {
    const board = boardModule.getBoard();

    // creates a cells array that contains each board value from cells 1 to 9
    const cells = [];
    board.forEach((row) => {
      row.forEach((cell) => {
        cells.push(cell);
      });
    });

    // renders each cell's value to each of the DOM's cellNodes
    let currentCell = 0;
    cellNodeList.forEach((node) => {
      node.textContent = cells[currentCell];
      currentCell += 1;
    });
  }

  return { renderBoard };
})();

const controllerModule = (function controller() {
  const playerSymbols = ['X', 'O'];
  let turn = 0;
  const cellNumberToPosition = {
    0: Position(0, 0),
    1: Position(0, 1),
    2: Position(0, 2),
    3: Position(1, 0),
    4: Position(1, 1),
    5: Position(1, 2),
    6: Position(2, 0),
    7: Position(2, 1),
    8: Position(2, 2),
  };
  /**
   * Sets the turn to the player and disables empty cells.
   */
  function setTurn() {
    console.log(turn);
    const cellNodeList = document.querySelectorAll('.board__cell');
    // makes each empty cell clickable to allow the player to play a turn then render the board
    let currentCell = 0;
    cellNodeList.forEach((node) => {
      const targetPos = cellNumberToPosition[currentCell];
      if (node.textContent === '') {
        node.addEventListener('click', () => {
          // plays a turn to affect the board array
          boardModule.playTurn(targetPos, playerSymbols[turn % 2]);
          // renders the board after the turn
          displayEngine.renderBoard();
          turn += 1;
        });
      } else {
        // reset event listeners for taken cells
        node.parentElement.replaceChild(node.cloneNode(true), node);
      }
      currentCell += 1;
    });
  }

  return { setTurn };
})();

boardModule.newGame();
controllerModule.setTurn();
