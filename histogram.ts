export type ReducingResult = {
  maxIndex: number;
  width: number;
  height: number;
  maxArea: number;
};

export class Stack<T> {
  protected items: T[] = [];
  push = (element: T): this => {
    this.items.unshift(element);
    return this;
  };
  pop = (): T | undefined => this.items.shift();
  get = (index: number): T | undefined => this.items[index];
  peek = (): T | undefined => this.get(0);
  isempty = (): boolean => this.items.length === 0;
  size = (): number => this.items.length;
}

export function getMaxRectHistogramIndex(heights: number[]): ReducingResult {
  const n = heights.length;
  const left: number[] = [],
    right: number[] = [];

  const mystack = new Stack();
  for (
    let i = 0;
    i < n;
    ++i //Fill left
  ) {
    if (mystack.isempty()) {
      left[i] = 0;
      mystack.push(i);
    } else {
      // @ts-ignore
      while (!mystack.isempty() && heights[mystack.peek()] >= heights[i])
        mystack.pop();
      // @ts-ignore
      left[i] = mystack.isempty() ? 0 : mystack.peek() + 1;
      mystack.push(i);
    }
  }
  while (!mystack.isempty())
    //Clear stack
    mystack.pop();

  for (
    let i = n - 1;
    i >= 0;
    --i //Fill right
  ) {
    if (mystack.isempty()) {
      right[i] = n - 1;
      mystack.push(i);
    } else {
      // @ts-ignore
      while (!mystack.isempty() && heights[mystack.peek()] >= heights[i])
        mystack.pop();
      // @ts-ignore
      right[i] = mystack.isempty() ? n - 1 : mystack.peek() - 1;
      mystack.push(i);
    }
  }
  let maxArea: number = 0; //Stores max_area
  let maxIndex = 0;
  let height = 0;
  let width = 0;
  for (let i = 0; i < n; ++i) {
    let area = heights[i] * (right[i] - left[i] + 1);
    if (area > maxArea) {
      maxArea = area;

      maxIndex = i;
      height = heights[i];
      width = right[i] - left[i] + 1;
    }
  }

  return {
    maxIndex,
    height,
    width,
    maxArea
  } as ReducingResult;
}

export function getMaxRectHistogramIndex00(heights: number[]): ReducingResult {
  // Create an empty stack. The stack
  // holds indexes of hist[] array
  // The bars stored in stack are always
  // in increasing order of their heights.
  const stack = new Stack<number>();

  let max_area = 0; // Initialize max area
  let maxIndex; // To store top of stack
  let area_with_top = 0; // To store area with top
  // bar as the smallest bar
  let width = 0;
  let height = 0;

  // Run through all bars of
  // given histogram
  let index = 0;
  while (index < heights.length) {
    // If this bar is higher than the
    // bar on top stack, push it to stack
    let top = stack.peek();
    if (
      stack.isempty() ||
      top === undefined ||
      heights[top] <= heights[index]
    ) {
      stack.push(index);
      index += 1;
    } else {
      // If this bar is lower than top of stack,
      // then calculate area of rectangle with
      // stack top as the smallest (or minimum
      // height) bar. 'i' is 'right index' for
      // the top and element before top in stack
      // is 'left index'
      top = stack.pop();
      if (top === undefined) {
        continue;
      }
      area_with_top =
        heights[top] * (stack.isempty() ? index : index - top - 1);

      if (max_area < area_with_top) {
        maxIndex = top;
        max_area = area_with_top;
        height = heights[top];
        width = stack.isempty() ? index : index - top - 1;
      }
    }
  }

  // Now pop the remaining bars from
  // stack and calculate area with every
  // popped bar as the smallest bar
  while (!stack.isempty()) {
    let top = stack.pop();
    if (top === undefined) {
      throw new Error('failed');
    }
    if (stack.isempty()) {
      area_with_top = heights[top] * index;
    } else {
      let peek = stack.peek();
      if (peek === undefined) {
        throw new Error('failed');
      }
      area_with_top = heights[top] * (index - peek - 1);
    }

    if (max_area < area_with_top) {
      max_area = area_with_top;
      maxIndex = top;
      height = heights[top];
      width = stack.isempty() ? index : index - top - 1;
    }
  }

  return {
    maxIndex,
    height,
    width
  } as ReducingResult;
}
