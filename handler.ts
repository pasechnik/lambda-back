import { getMaxSquare, NumberBoard, Square } from './app';

const ZERO = 0;

export const puzzle = async (event) => {
  let board: NumberBoard = [];

  if (event.body) {
    const body: { board?: NumberBoard } = JSON.parse(event.body);

    if (body.board !== undefined) {
      board = body.board;
    }
  }

  const { bigSquare }: { bigSquare: Square } = getMaxSquare(board, ZERO);

  return {
    statusCode: 200,
    body: JSON.stringify({ square: bigSquare, board }, null, 2)
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
