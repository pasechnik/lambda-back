import { getMaxSquare } from '../square';

describe('index', () => {
  it('returns 0 when empty list is given', () => {
    const board = [];
    const result = getMaxSquare(board, 0);
    const expectedResult = {
      bigSquare: { left: 0, size: 0, top: 0 },
      counts: [],
      nCols: 0,
      nRows: 0
    };

    expect(result).toEqual(expectedResult);
  });

  it('returns biggest square', () => {
    const board = [
      [0, 1, 1, 0],
      [0, 1, 1, 0]
    ];
    const { bigSquare } = getMaxSquare(board, 0);
    const expectedResult = { left: 1, size: 2, top: 0 };

    expect(bigSquare).toEqual(expectedResult);
  });

  it('returns biggest square for 3', () => {
    const board = [
      [0, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0, 1],
      [0, 1, 1, 1, 1, 1]
    ];
    const { bigSquare } = getMaxSquare(board, 0);
    const expectedResult = { left: 3, size: 3, top: 1 };

    expect(bigSquare).toEqual(expectedResult);
  });

  it('returns biggest square for 4', () => {
    const board = [
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 1],
      [0, 1, 1, 0, 1, 1],
      [0, 1, 0, 1, 1, 1]
    ];
    const { bigSquare } = getMaxSquare(board, 0);
    const expectedResult = { left: 0, size: 4, top: 0 };

    expect(bigSquare).toEqual(expectedResult);
  });
});
