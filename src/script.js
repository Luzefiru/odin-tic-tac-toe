function Position(x, y) {
  return { x, y };
}

function boardModel() {
  // board[row][col]
  let board = [
    ['X', 'O', 'X'],
    ['O', 'X', 'X'],
    ['X', 'X', 'O'],
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
}
