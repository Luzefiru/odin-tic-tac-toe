function Position(x, y) {
  return { x, y };
}

function boardModel() {
  // board[row][col]
  let board = [
    ['O', 'O', 'X'],
    ['O', 'X', 'O'],
    ['X', 'O', 'X'],
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
}

boardModel();
