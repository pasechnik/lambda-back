import { NumberBoard } from './app';
import { getMaxRectHistogramIndex, ReducingResult } from './histogram';

export type Rectangle = {
  size: RectangularSize;
  top: number;
  left: number;
};
export type RectangularResult = {
  bigRectangle: Rectangle;
  nRows: number;
  nCols: number;
};
export type RectangularSize = {
  width: number;
  height: number;
  area: number;
};

export function createRectangularSize({
  width = 0,
  height = 0
}: {
  width: number;
  height: number;
}): RectangularSize {
  return {
    area: width * height,
    width,
    height
  };
}

export function createRectangle({
  width = 0,
  height = 0,
  top = 0,
  left = 0
}: {
  width: number;
  height: number;
  top: number;
  left: number;
}): Rectangle {
  return {
    top,
    left,
    size: createRectangularSize({ width, height })
  };
}

export function getMaxRectangle(
  board: NumberBoard,
  zeroCell = 0
): RectangularResult {
  const nRows = board.length;
  const nCols = board[0]?.length ?? 0;
  let hist: number[] = Array(nCols).fill(0);

  const bigRectangle = board.reduce<Rectangle>(
    (prev, current, i) => {
      hist = current.map((val, index) =>
        val === zeroCell ? 0 : hist[index] + 1
      );
      const histResult: ReducingResult = getMaxRectHistogramIndex(hist);

      if (histResult.maxArea > prev.size.area) {
        return createRectangle({
          width: histResult.width,
          height: histResult.height,
          top: i - histResult.height + 1,
          left: histResult.maxIndex
        });
      }

      return prev;
    },
    createRectangle({
      width: 0,
      height: 0,
      top: 0,
      left: 0
    })
  );

  return {
    bigRectangle,
    nCols,
    nRows
  };
}
