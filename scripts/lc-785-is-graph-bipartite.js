// 1st solution using recursive approach
// stack data structure
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
// var isBipartite = function(graph) {
//     // 0 -> no color, 1 -> color 1, 2 -> color 2
//     const color = Array.from({length: graph.length}, () => 0);

//     function canColor(node, colorToColorWith) {
//       debugger;
//       if (color[node] === -1 * colorToColorWith) {
//         return false;
//       }

//       if (!color[node]) {
//           color[node] = colorToColorWith;

//           for (let i = 0; i < graph[node].length; i++) {
//               if (!canColor(graph[node][i], -1 * colorToColorWith)) {
//                   return false;
//                 }
//             }

//         return true;
//       }

//       return true;
//     }

//     for (let i = 0; i < graph.length; i++) {
//         if (!color[i]) {
//             const isColoringPossible = canColor(i, 1) || canColor(i, -1);

//             if (!isColoringPossible) {
//                 return false;
//             }
//         }
//     }

//     return true;
// };

// 2nd solution with queue data structure
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  // 0 -> no color, 1 -> color 1, 2 -> color 2
  const color = Array.from({ length: graph.length }, () => 0);

  for (let j = 0; j < graph.length; j++) {
    if (!color[j]) {
      // 0 -> node, 1 -> color
      const q = [[j, 1]];

      while (q.length) {
        const [node, colorToColorWith] = q.shift();
        if (color[node] === -1 * colorToColorWith) {
          return false;
        }

        if (!color[node]) {
          color[node] = colorToColorWith;

          for (let i = 0; i < graph[node].length; i++) {
            q.push([graph[node][i], -1 * colorToColorWith]);
          }
        }
      }
    }
  }

  return true;
};

const x = isBipartite([
  [1, 2, 3],
  [0, 2],
  [0, 1, 3],
  [0, 2],
]);

console.log({ x });
