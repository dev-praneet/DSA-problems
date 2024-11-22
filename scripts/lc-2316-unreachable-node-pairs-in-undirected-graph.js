// first solution using BFS
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countPairs = function (n, edges) {
  // do a BFS, find the number of disconnected graphs
  // and the count of nodes in all those graphs

  const discovered = new Set();
  const adjNodes = {};
  const nodeCount = [];

  for (let i = 0; i < n; i++) {
    adjNodes[i] = new Set();
  }

  for (const [a, b] of edges) {
    adjNodes[a].add(b);
    adjNodes[b].add(a);
  }

  for (let i = 0; i < n; i++) {
    let count = 1;

    if (!discovered.has(i)) {
      const q = [i];

      while (q.length) {
        const node = q.shift();
        discovered.add(node);

        for (const adjNode of adjNodes[node]) {
          if (!discovered.has(adjNode)) {
            count++;
            discovered.add(adjNode);
            q.push(adjNode);
          }
        }
      }

      nodeCount.push(count);
    }
  }

  let res = (n * (n - 1)) / 2;

  for (let i = 0; i < nodeCount.length; i++) {
    const numberOfEdges = nodeCount[i];
    res -= (numberOfEdges * (numberOfEdges - 1)) / 2;
  }

  return res;
};



// second solution using union find
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countPairs = function(n, edges) {
  // using union find:
  const rootAndSize = Array.from({ length: n }, () => -1);

  function find(a) {
    if (rootAndSize[a] < 0) {
      return a;
    }

    return find(rootAndSize[a]);
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA === rootB) {
      return;
    }

    if (rootA < rootB) {
      rootAndSize[rootA] += rootAndSize[rootB];
      rootAndSize[rootB] = rootA;
    } else {
      rootAndSize[rootB] += rootAndSize[rootA];
      rootAndSize[rootA] = rootB;
    }
  }

  for (const [a, b] of edges) {
    union(a, b);
  }

  let res = (n * (n - 1)) / 2;

  for (const negativeSize of rootAndSize) {
    if (negativeSize > -1) {
      continue;
    }

    const size = -1 * negativeSize;
    res -= (size * (size - 1)) / 2;
  }

  return res;
};
