/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let maxDoubleCount = 0;
  let res = 0;
  debugger;
  for (const num of nums) {
    debugger;
    let x = num;
    let addOneCount = 0;
    let doubleCount = 0;
    while (x !== 0) {
      addOneCount += x & 1;
      x = x >> 1;

      if (x !== 0) {
        doubleCount += 1;
      }
    }

    if (doubleCount > maxDoubleCount) {
      maxDoubleCount = doubleCount;
    }

    res += addOneCount;
  }

  return res + maxDoubleCount;
};

const x = minOperations([1, 5]);
console.log({x});
