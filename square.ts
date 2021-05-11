import { Board, Field, NumberBoard, NumberRow } from './app';

export type Square = {
  size: number;
  top: number;
  left: number;
};

export type SquareResult = {
  counts: Board<number>;
  bigSquare: Square;
  nRows: number;
  nCols: number;
};

export type SquareCount = number;
export type ShapeCount = SquareCount;

export function createSquare({
  size = 0,
  top = 0,
  left = 0
}: {
  size: number;
  top: number;
  left: number;
}): Square {
  return {
    size,
    top,
    left
  };
}

const ZERO = 0;

// Prepares 2d array with default value
export function fillZeros<T>(m: number, n: number, value: T): Board<T> {
  return [...Array(m)].map(() => Array(n).fill(value));
}

// Prepares 2d array with default number value
export function fillNumberZeros(m: number, n: number, value = 0): NumberBoard {
  return fillZeros<number>(m, n, value);
}

// Compares square and prepares new result if the square is bigger
function chooseBiggerSquareResult(
  result: SquareResult,
  square: Square
): SquareResult {
  return square.size > result.bigSquare.size
    ? { ...result, bigSquare: square }
    : result;
}

// reducing cell callback function
function reduceSquareCell(
  previousResult: SquareResult,
  rowIndex: number,
  columnIndex: number,
  cell: Field,
  zeroCell: Field = ZERO
): SquareResult {
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

  return chooseBiggerSquareResult(
    previousResult,
    createSquare({
      size,
      top: rowIndex,
      left: columnIndex
    })
  );
}

// reducing row callback function
function reduceSquareRow(
  rowResult: SquareResult,
  rowIndex: number,
  row: NumberRow,
  zeroCell: number
): SquareResult {
  return row.reduceRight<SquareResult>(
    (previousCellResult, cell, colIndex) =>
      reduceSquareCell(previousCellResult, rowIndex, colIndex, cell, zeroCell),
    rowResult
  );
}

// function calculates the biggest square on a field
export function getMaxSquare(board: NumberBoard, zeroCell = 0): SquareResult {
  const nRows = board.length;
  const nCols = board[0]?.length ?? 0;

  const initialResult: SquareResult = {
    counts: fillNumberZeros(nRows, nCols),
    bigSquare: createSquare({ size: 0, left: 0, top: 0 }),
    nCols,
    nRows
  };

  return board.reduceRight<SquareResult>(
    (previousRowResult: SquareResult, row: NumberRow, rowIndex: number) =>
      reduceSquareRow(previousRowResult, rowIndex, row, zeroCell),
    initialResult
  );
}
