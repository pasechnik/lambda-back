import {
  createRectangularSize,
  getMaxRectangle,
  RectangularResult
} from '../rectangle';

describe('index', () => {
  it('returns 0 when empty list is given', () => {
    const board = [];
    const result = getMaxRectangle(board, 0);
    const expectedResult: RectangularResult = {
      bigRectangle: {
        top: 0,
        left: 0,
        size: createRectangularSize({ width: 0, height: 0 })
      },
      nCols: 0,
      nRows: 0
    };

    expect(result).toEqual(expectedResult);
  });

  it('returns biggest rectangle', () => {
    const board = [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0]
    ];
    const { bigRectangle } = getMaxRectangle(board, 0);
    const expectedResult = {
      top: 0,
      left: 1,
      size: createRectangularSize({ width: 2, height: 3 })
    };

    expect(bigRectangle).toEqual(expectedResult);
  });

  it('returns biggest rectangle for 3', () => {
    const board = [
      [0, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0, 1],
      [0, 1, 1, 1, 1, 1]
    ];
    const { bigRectangle } = getMaxRectangle(board, 0);
    const expectedResult = {
      top: 2,
      left: 2,
      size: createRectangularSize({ width: 5, height: 2 })
    };

    expect(bigRectangle).toEqual(expectedResult);
  });

  it('returns biggest rectangle for 4', () => {
    const board = [
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 1],
      [0, 1, 1, 0, 1, 1],
      [0, 1, 0, 1, 1, 1]
    ];
    const { bigRectangle } = getMaxRectangle(board, 0);
    const expectedResult = {
      top: 0,
      left: 0,
      size: createRectangularSize({ width: 4, height: 4 })
    };

    expect(bigRectangle).toEqual(expectedResult);
  });
});
