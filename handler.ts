import { getMaxSquare, Square, SquareResult, ShapeCount } from './square';

import { Board, NumberBoard } from './app';
import { getMaxRectangle, Rectangle, RectangularResult } from './rectangle';

const ZERO = 0;

enum QueryType {
  square = 'square',
  rectangle = 'rectangle'
}

export const puzzle = async (
  event
): Promise<{
  statusCode: number;
  body: string;
}> => {
  let board: NumberBoard = [];
  let queryType: QueryType = QueryType.square;
  let result:
    | {
        shape: Rectangle | Square;
        queryType?: QueryType;
        board?: NumberBoard;
        counts?: Board<ShapeCount>;
      }
    | Record<string, never> = {};

  if (event.body) {
    const body: { board?: NumberBoard; queryType?: string } = JSON.parse(
      event.body
    );

    if (body.board !== undefined) {
      board = body.board;
    }
    if (
      body.queryType !== undefined &&
      body.queryType === QueryType.rectangle
    ) {
      queryType = QueryType.rectangle;
    }
  }

  if (queryType === QueryType.square) {
    const { bigSquare }: SquareResult = getMaxSquare(board, ZERO);
    result = { shape: bigSquare, queryType };
  }
  if (queryType === QueryType.rectangle) {
    const { bigRectangle }: RectangularResult = getMaxRectangle(board, ZERO);
    result = { shape: bigRectangle };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2)
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
