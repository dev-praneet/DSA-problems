/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
  let extraLeft = 0;

  let res = 0;

  for (let i = 0; i < s.length; i++) {
    debugger;
    if (s[i] === "(") {
      extraLeft += 1;

      if (i + 1 === s.length) {
        res += 2 * extraLeft;
        extraLeft = 0;
      }
    } else {
      if (extraLeft === 0) {
        extraLeft += 1;
        res += 1;
      }

      if (i + 1 < s.length) {
        if (s[i + 1] === ")") {
          extraLeft -= 1;
          i += 1;
        } else {
          extraLeft -= 1;
          res += 1;
        }
      } else {
        res += extraLeft * 2 - 1;
        extraLeft = 0;
      }
    }
  }

  return res + (extraLeft * 2);
};

const x = minInsertions("(())()(()((())))");
console.log({x});
