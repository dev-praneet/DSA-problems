/**
 * @param {number[][]} edges
 * @param {number} signalSpeed
 * @return {number[]}
 */
var countPairsOfConnectableServers = function (edges, signalSpeed) {
  const n = edges.length + 1;
  const adjNodes = Array.from({ length: n }, () => ({}));

  for (const [u, v, weight] of edges) {
    adjNodes[u][v] = weight;
    adjNodes[v][u] = weight;
  }

  const dp = {};

  function getRelevantServerCount(rootNode, nextNode, cumWeight) {
    const key = `${rootNode}-${nextNode}-${cumWeight % signalSpeed}`;

    if (key in dp) {
      return dp[key];
    }

    let count = 0;

    if (!(nextNode in adjNodes[rootNode])) {
      return count;
    }

    const weight = adjNodes[rootNode][nextNode];
    const newWeight = cumWeight + weight;

    if (newWeight % signalSpeed === 0) {
      count++;
    }

    for (const nextNextNode of Object.keys(adjNodes[nextNode]).map(Number)) {
      if (nextNextNode === rootNode) {
        continue;
      }

      count += getRelevantServerCount(nextNode, nextNextNode, newWeight);
    }

    dp[key] = count;

    return count;
  }

  function getServerCount(node) {
    const neighbours = Object.keys(adjNodes[node]).map(Number);

    const validServerCount = [];

    for (let i = 0; i < neighbours.length; i++) {
      validServerCount.push(getRelevantServerCount(node, neighbours[i], 0));
    }

    let res = 0;

    for (let i = 0; i < validServerCount.length; i++) {
      for (let j = i + 1; j < validServerCount.length; j++) {
        res += validServerCount[i] * validServerCount[j];
      }
    }

    return res;
  }

  const res = [];

  for (let node = 0; node < n; node++) {
    if (Object.keys(adjNodes[node]).length < 2) {
      res.push(0);
      continue;
    }

    const count = getServerCount(node);
    res.push(count);
  }

  return res;
};

const x = countPairsOfConnectableServers(
  [
    [1, 0, 1],
    [2, 1, 1],
    [3, 2, 4],
    [4, 0, 3],
    [5, 4, 1],
    [6, 5, 3],
  ],
  2
);

console.log({ x });
