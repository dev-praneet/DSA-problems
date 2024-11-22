/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var getAncestors = function (n, edges) {
  // This approach gives correct solution for roughly half of
  // the test cases, but the time limit exceeds
  // const ancestors = Array.from({length: n}, () => null);

  // // -1 corresponds to no parent
  // const parent = Array.from({length: n}, () => new Set());

  // for (const [u, v] of edges) {
  //     parent[v].add(u);
  // }

  // // now generate ancestor from parent
  // function getAllAncestors(node) {
  //     if (parent[node].size === 0) {
  //         ancestors[node] = []
  //         return ancestors[node];
  //     }

  //     const res = [...parent[node]];

  //     for (const oneParent of parent[node]) {
  //         res.push(...getAllAncestors(oneParent));
  //     }

  //     ancestors[node] = [...new Set(res)]
  //     return ancestors[node];
  // }

  // for (let i = 0; i < n; i++) {
  //     if (ancestors[i]) {
  //         continue;
  //     }

  //     ancestors[i] = [];
  //     getAllAncestors(i);
  // }

  // ancestors.forEach((arr) => arr.sort((a, b) => a - b));
  // return ancestors;

  // 2nd solution from
  // use dfs to go through the tree

  const discovered = Array.from({ length: n }, () => false);
  const ancestors = Array.from({ length: n }, () => new Set());
  const adjNodes = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    adjNodes[u].push(v);
  }

  function dfs(node, baseNode) {
    debugger;
    if (discovered[node]) {
      return;
    }

    discovered[node] = true;

    if (node !== baseNode) {
      ancestors[node].add(baseNode);
    }

    for (const adjNode of adjNodes[node]) {
      dfs(adjNode, baseNode);
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      discovered[j] = false;
    }

    if (discovered[i]) {
      continue;
    }

    dfs(i, i);
  }

  return ancestors.map((arr) => [...arr].sort((a, b) => a - b));
};

const x = getAncestors(5, [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
  [3, 4],
]);
console.log({ x });
