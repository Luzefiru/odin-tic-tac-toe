function Position(x, y) {
  return { x, y };
}

function boardModel() {
  // board[row][col]
  let board = [
    ['X', 'O', 'X'],
    ['O', 'X', 'X'],
    ['X', 'X', 'X'],
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
  function isWinner(symbol) {
    let noMatch = true;

    // checks for 3-matching rows
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
    // checks for 3-matching columns

    // checks for diagonal matches

    // if noMatch is true, then {symbol} did not win, otherwise {symbol} wins
    return !noMatch;
  }

  console.log(isWinner('X'));
}

boardModel();
