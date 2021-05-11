// numberZeros(5, 5, 0);
// input array with 0 or 1
import { getMaxRectangle } from './rectangle';

const board = [
  [0, 0, 0],
  [1, 1, 1],
  [1, 1, 1],
  [1, 0, 1]
  // [1, 1, 0, 0, 0, 0, 0],
  // [1, 1, 1, 0, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1],
  // [0, 0, 1, 1, 1, 1, 1],
  // [0, 0, 1, 1, 1, 1, 1],
  // [0, 1, 1, 1, 1, 1, 0],
  // [0, 1, 1, 1, 1, 0, 0]
  /*
  [1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0, 0]
 */
];

// console.log({ board });
// returns result structure
const ZERO = 0;
const { bigRectangle, counts } = getMaxRectangle(board, ZERO);

// log result
// console.log({ bigRectangle, counts });
