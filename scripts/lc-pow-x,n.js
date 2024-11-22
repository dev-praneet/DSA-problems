/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  function getPositivePow(x, n) {
    if (n === 1) {
      return x;
    }

    if (n === 0) {
      return 1;
    }

    const halfPow = myPow(x, Math.floor(n / 2));

    if (n % 2 === 0) {
      return halfPow * halfPow;
    } else {
      return halfPow * halfPow * x;
    }
  }

  let absN = n > 0 ? n : -1 * n;
  const positivePower = getPositivePow(x, absN);

  return n > 0 ? positivePower : 1 / positivePower;
};
