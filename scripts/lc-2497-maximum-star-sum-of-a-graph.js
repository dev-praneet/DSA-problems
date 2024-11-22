/**
 * @param {number[]} vals
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var maxStarSum = function (vals, edges, k) {
  const n = vals.length;
  const discovered = new Set();

  const adjNodes = {};

  for (let i = 0; i < n; i++) {
    adjNodes[i] = [];
  }

  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];

    adjNodes[a].push(b);
    adjNodes[b].push(a);
  }

  let res = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < n; i++) {
    if (!discovered.has(i)) {
      const q = [i];

      while (q.length) {
        const node = q.shift();
        discovered.add(node);

        const sortedAdjNodes = adjNodes[node].toSorted(
          (a, b) => vals[b] - vals[a]
        );
        let maxSum = vals[node];

        for (let j = 0; j < k && j < sortedAdjNodes.length; j++) {
          const adjNode = sortedAdjNodes[j];

          if (vals[adjNode] > 0) {
            maxSum += vals[adjNode];
          }

          if (!discovered.has(adjNode)) {
            discovered.add(adjNode);
            q.push(adjNode);
          }
        }

        if (maxSum > res) {
          res = maxSum;
        }
        
        res;
      }
    }
  }

  return res;
};

const vals = [1, 2, 3, 4, 10, -10, -20];
const edges = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [3, 5],
  [3, 6],
];
const k = 2;

const x = maxStarSum(vals, edges, k);
console.log({ x });
