/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximalNetworkRank = function (n, roads) {
  const adjNodes = Array.from({ length: n }, () => new Set());

  for (const [u, v] of roads) {
    adjNodes[u].add(v);
    adjNodes[v].add(u);
  }

  let nodes = Array.from({ length: n }, (_, index) => index);
  nodes.sort((a, b) => adjNodes[b].size - adjNodes[a].size);

  const sizes = [];

  for (const node of nodes) {
    sizes.push(adjNodes[node].size);
  }

  const initialLevel = sizes[0] + sizes[1];
  let maxNetworkRank = 0;

  outer: for (let i = 0; i < nodes.length; ) {
    for (let j = i + 1; j < nodes.length; ) {
      const firstNode = nodes[i];
      const secondNode = nodes[j];

      let networkRank = sizes[i] + sizes[j];

      if (adjNodes[firstNode].has(secondNode)) {
        networkRank -= 1;
      }

      if (networkRank > maxNetworkRank) {
        maxNetworkRank = networkRank;
      }

      if (sizes[i] + sizes[j] < initialLevel) {
        return maxNetworkRank;
      }

      if (sizes[j + 1] !== sizes[j]) {
        if (i === j - 1) {
          j += 1;
        } else {
          i += 1;
          j = i + 1;
          continue outer;
        }
      } else {
        j += 1;
      }
    }

    i += 1;
  }

  return maxNetworkRank;
};

// 2nd solution without using sort:
/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximalNetworkRank = function(n, roads) {
    const adjNodes = Array.from({length: n}, () => new Set());

    for (const [u, v] of roads) {
        adjNodes[u].add(v);
        adjNodes[v].add(u);
    }    

    adjNodes[-1] = { size: Number.NEGATIVE_INFINITY };

    let nodes = Array.from({length: n}, (_, index) => index);

    let nodesWithLargestNeighbour = [];
    let nodesWith2ndLargestNeighbour = [];

    let nodeWithLargestNeighbour = 0;
    let nodeWith2ndLargestNeighbour = -1;

    for (let i = 0; i < nodes.length; i++) {
        if (adjNodes[i].size > adjNodes[nodeWithLargestNeighbour].size) {
            nodeWith2ndLargestNeighbour = nodeWithLargestNeighbour;
            nodeWithLargestNeighbour = i;
            nodesWith2ndLargestNeighbour = nodesWithLargestNeighbour;
            nodesWithLargestNeighbour = [i];
            continue;
        }

        if (adjNodes[i].size === adjNodes[nodeWithLargestNeighbour].size) {
            nodesWithLargestNeighbour.push(i);
            continue;
        }

        if (adjNodes[i].size > adjNodes[nodeWith2ndLargestNeighbour].size) {
            nodeWith2ndLargestNeighbour = i;
            nodesWith2ndLargestNeighbour = [i];
            continue;
        }

        if (adjNodes[i].size === adjNodes[nodeWith2ndLargestNeighbour].size) {
            nodesWith2ndLargestNeighbour.push(i);   
        }
    }

    nodes = [...nodesWithLargestNeighbour, ...nodesWith2ndLargestNeighbour];

    const sizes = [];

    for (const node of nodes) {
        sizes.push(adjNodes[node].size);
    }

    const initialLevel = sizes[0] + sizes[1];
    let maxNetworkRank = 0;

    outer: for (let i = 0; i < nodes.length;) {
        for (let j = i + 1; j < nodes.length;) {
            const firstNode = nodes[i];
            const secondNode = nodes[j];
            
            let networkRank = sizes[i] + sizes[j];

            if (adjNodes[firstNode].has(secondNode)) {
                networkRank -= 1;
            }

            if (networkRank > maxNetworkRank) {
                maxNetworkRank = networkRank;
            }

            if (sizes[i] + sizes[j] < initialLevel) {
                return maxNetworkRank;
            }

            if (sizes[j + 1] !== sizes[j]) {
                if (i === j - 1) {
                    j += 1;
                } else {
                    i += 1;
                    j = i + 1;
                    continue outer;
                }
            } else {
                j += 1;
            }
        }

        i += 1;
    }

    return maxNetworkRank;
};


const x = maximalNetworkRank(8, [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [5, 6],
  [5, 7],
]);

console.log({ x });
