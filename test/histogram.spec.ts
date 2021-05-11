import { getMaxRectHistogramIndex, ReducingResult } from '../histogram';

describe('reduceHistogram', () => {
  describe('getMaxRectHistogramIndex', () => {
    it('should return [1, 1] at 0 for [1, 0]', () => {
      const expectedResult: ReducingResult = {
        maxArea: 1,
        maxIndex: 0,
        width: 1,
        height: 1
      };
      const heights = [1, 0];
      const result = getMaxRectHistogramIndex(heights);
      expect(result).toEqual(expectedResult);
    });
    it('should return [1, 1] at 1 for [0, 1, 0]', () => {
      const expectedResult: ReducingResult = {
        maxArea: 1,
        maxIndex: 1,
        width: 1,
        height: 1
      };
      const heights = [0, 1, 0];
      const result = getMaxRectHistogramIndex(heights);
      expect(result).toEqual(expectedResult);
    });
    it('should return [2, 1] at 0 for [1, 1]', () => {
      const expectedResult: ReducingResult = {
        maxArea: 2,
        maxIndex: 0,
        width: 2,
        height: 1
      };
      const heights = [1, 1];
      const result = getMaxRectHistogramIndex(heights);
      expect(result).toEqual(expectedResult);
    });
    it('should return [3, 2] at 1 for [1, 2, 3, 4 ]', () => {
      const expectedResult: ReducingResult = {
        maxArea: 6,
        maxIndex: 1,
        width: 3,
        height: 2
      };
      const heights = [1, 2, 3, 4];
      const result = getMaxRectHistogramIndex(heights);
      expect(result).toEqual(expectedResult);
    });
    it('should return [2, 3] at 1 for [1, 3, 4, 2]', () => {
      const expectedResult: ReducingResult = {
        maxArea: 6,
        maxIndex: 1,
        width: 2,
        height: 3
      };
      const heights = [1, 3, 4, 2];
      const result = getMaxRectHistogramIndex(heights);
      expect(result).toEqual(expectedResult);
    });
    it('should return [2, 3] at 1 for [1, 3, 0, 2, 5, 3, 3, 2]', () => {
      const expectedResult: ReducingResult = {
        maxArea: 10,
        maxIndex: 3,
        width: 5,
        height: 2
      };
      const heights = [1, 3, 0, 2, 5, 3, 3, 2];
      const result = getMaxRectHistogramIndex(heights);
      expect(result).toEqual(expectedResult);
    });
  });
});
