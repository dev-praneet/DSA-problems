/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
var spiralMatrixIII = function (rows, cols, rStart, cStart) {
  const res = [[rStart, cStart]];

  const hBound = [cStart, cStart];
  const vBound = [rStart, rStart];

  let rCurrent = rStart;
  let cCurrent = cStart;

  const nextMove = {
    top: "right",
    right: "down",
    down: "left",
    left: "top",
  };

  function addCell(i, j) {
    if (i > -1 && i < rows && j > -1 && j < cols) {
      res.push([i, j]);
    }
  }

  function traverse(direction) {
    if (res.length === rows * cols) {
      return;
    }
    switch (direction) {
      case "right": {
        cCurrent++;
        addCell(rCurrent, cCurrent);
        if (cCurrent > hBound[1]) {
          hBound[1] = cCurrent;
          traverse(nextMove[direction]);
        } else {
          traverse(direction);
        }
        break;
      }

      case "down": {
        rCurrent++;
        addCell(rCurrent, cCurrent);
        if (rCurrent > vBound[1]) {
          vBound[1] = rCurrent;
          traverse(nextMove[direction]);
        } else {
          traverse(direction);
        }
        break;
      }

      case "left": {
        cCurrent--;
        addCell(rCurrent, cCurrent);
        if (cCurrent < hBound[0]) {
          hBound[0] = cCurrent;
          traverse(nextMove[direction]);
        } else {
          traverse(direction);
        }
        break;
      }

      case "top": {
        rCurrent--;
        addCell(rCurrent, cCurrent);
        if (rCurrent < vBound[0]) {
          vBound[0] = rCurrent;
          traverse(nextMove[direction]);
        } else {
          traverse(direction);
        }
        break;
      }
    }
  }

  traverse("right");
  return res;
};

const x = spiralMatrixIII(1, 4, 0, 0);
