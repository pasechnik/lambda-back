export type Field = number;
export type Row<T> = T[];
export type NumberRow = Row<number>;
export type Board<T> = T[][];
export type NumberBoard = Board<Field>;
export type Square = {
  size: number;
  top: number;
  left: number;
};
export type Result = {
  counts: Board<number>;
  bigSquare: Square;
  nRows: number;
  nCols: number;
};

const ZERO = 0;

// Prepares 2d array with default value
function fillZeros<T>(m: number, n: number, value: T): Board<T> {
  return [...Array(m)].map(() => Array(n).fill(value));
}

// Prepares 2d array with default number value
function fillNumberZeros(m: number, n: number, value = 0): NumberBoard {
  return fillZeros<number>(m, n, value);
}

// Compares square and prepares new result if the square is bigger
function chooseBiggerResult(result: Result, square: Square): Result {
  return square.size > result.bigSquare.size
    ? { ...result, bigSquare: square }
    : result;
}

// reducing cell callback function
function reduceCell(
  previousResult: Result,
  rowIndex: number,
  columnIndex: number,
  cell: Field,
  zeroCell: Field = ZERO
): Result {
  if (cell === zeroCell) {
    return previousResult;
  }

  let size = 1;

  if (
    rowIndex < previousResult.nRows - 1 &&
    columnIndex < previousResult.nCols - 1
  ) {
    size =
      1 +
      Math.min(
        previousResult.counts[rowIndex][columnIndex + 1],
        previousResult.counts[rowIndex + 1][columnIndex],
        previousResult.counts[rowIndex + 1][columnIndex + 1]
      );
  }

  previousResult.counts[rowIndex][columnIndex] = size;

  return chooseBiggerResult(previousResult, {
    size,
    top: rowIndex,
    left: columnIndex
  });
}

// reducing row callback function
function reduceRow(
  previousRowResult: Result,
  rowIndex: number,
  row: NumberRow,
  zeroCell: number
): Result {
  return row.reduceRight<Result>(
    (previousCellResult, cell, colIndex) =>
      reduceCell(previousCellResult, rowIndex, colIndex, cell, zeroCell),
    previousRowResult
  );
}

// function calculates the biggest square on a field
export function getMaxSquare(board: NumberBoard, zeroCell = 0): Result {
  const nRows = board.length;
  const nCols = board[0]?.length ?? 0;

  const initialResult: Result = {
    counts: fillNumberZeros(nRows, nCols),
    bigSquare: { size: 0, left: 0, top: 0 },
    nCols,
    nRows
  };

  return board.reduceRight<Result>(
    (previousRowResult: Result, row: NumberRow, rowIndex: number) =>
      reduceRow(previousRowResult, rowIndex, row, zeroCell),
    initialResult
  );
}

// numberZeros(5, 5, 0);
// input array with 0 or 1
// const a = [
//   [1, 1, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1],
//   [0, 0, 1, 1, 1, 1, 1],
//   [0, 0, 1, 1, 1, 1, 1],
//   [0, 1, 1, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 0, 0]
// ];

// returns result structure
// const result = getMaxSquare(a, ZERO);

// log result
// console.log(result);
