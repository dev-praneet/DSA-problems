/**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function (arr) {
  const prevLessIndices = Array.from({ length: arr.length }, () => -1);
  const nextLessIndices = Array.from({ length: arr.length }, () => arr.length);
  const stack = [];

  debugger;
  for (let i = 0; i < arr.length; i++) {
    // equal to also because for a subarray like [5, 5, 5] I am choosing the rightmost
    //  5 as the minimum
    while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    prevLessIndices[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(i);
  }

  const stackForNext = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    while (
      stackForNext.length &&
      arr[stackForNext[stackForNext.length - 1]] > arr[i]
    ) {
      stackForNext.pop();
    }

    nextLessIndices[i] =
      stackForNext.length === 0
        ? arr.length
        : stackForNext[stackForNext.length - 1];
    stackForNext.push(i);
  }

  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += (nextLessIndices[i] - i) * (i - prevLessIndices[i]) * arr[i];
  }

  return sum % (Math.pow(10, 9) + 7);
};

const x = sumSubarrayMins([11, 81, 94, 43, 3]);
console.log({x});
