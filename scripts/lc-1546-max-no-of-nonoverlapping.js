/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maxNonOverlapping = function (nums, target) {
  if (!nums.length) {
    return 0;
  }

  const cumSum = [nums[0]];
  cumSum[-1] = 0;

  for (let i = 1; i < nums.length; i++) {
    cumSum[i] = cumSum[i - 1] + nums[i];
  }

  let count = 0;
  let prevRightmostIndex = -1;

  const hm = new Map();
  hm.set(0, -1);

  for (let i = 0; i < cumSum.length; i++) {
    const diff = cumSum[i] - target;
    if (hm.has(diff) && hm.get(diff) >= prevRightmostIndex) {
      count++;
      prevRightmostIndex = i;
    }
    hm.set(cumSum[i], i);
  }

  return count;
};
