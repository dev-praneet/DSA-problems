/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function (stoneValue) {
  const key = stoneValue.join(",");

  if (key in dp) {
    return dp[key];
  }

  if (stoneValue.length === 1) {
    return 0;
  }

  let totalSum = 0;

  for (let i = 0; i < stoneValue.length; i++) {
    totalSum += stoneValue[i];
  }

  let sumUptoIndex = 0;

  const valueForDifferentPartitions = [];
  for (let i = 0; i < stoneValue.length - 1; i++) {
    sumUptoIndex += stoneValue[i];
    const diff = totalSum - 2 * sumUptoIndex;

    const leftPart = stoneValue.slice(0, i + 1);
    const rightPart = stoneValue.slice(i + 1);

    if (diff > 0) {
      valueForDifferentPartitions.push(sumUptoIndex + stoneGameV(leftPart));
    }

    if (diff === 0) {
      valueForDifferentPartitions.push(
        Math.max(
          sumUptoIndex + stoneGameV(leftPart),
          sumUptoIndex + stoneGameV(rightPart)
        )
      );
    }

    if (diff < 0) {
      valueForDifferentPartitions.push(
        sumUptoIndex + diff + stoneGameV(rightPart)
      );
    }
  }

  const res = Math.max(...valueForDifferentPartitions);
  dp[key] = res;
  return res;
};

const dp = {};
// this solution is incorrect. use the solution from leetcode