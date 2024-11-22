/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    debugger;
//   if (amount in memooo) {
  if (dpttt.has(amount)) {
    return dpttt.get(amount);
    // return memooo[amount];
  }

  const notLargerThanAmtCoins = coins.filter((coin) => coin <= amount);
  if (notLargerThanAmtCoins.length === 0) {
    // memooo[amount] = -1;
    dpttt.set(amount, -1);
    return -1;
  }

  const coinCount = [];
  for (let i = 0; i < notLargerThanAmtCoins.length; i++) {
    coinCount.push(coinChange(coins, amount - notLargerThanAmtCoins[i]));
  }

  const validCoinCount = [];
  for (let i = 0; i < coinCount.length; i++) {
    if (coinCount[i] !== -1) {
      validCoinCount.push(coinCount[i]);
    }
  }

  if (validCoinCount.length) {
    // memooo[amount] = 1 + Math.min(...validCoinCount);
    dpttt.set(amount, 1 + Math.min(...validCoinCount));
    return dpttt.get(amount);
  }

//   memooo[amount] = -1;
  dpttt.set(amount, -1);
  return dpttt.get(amount);
//   return memooo[amount];
};

// const memooo = {
//   0: 0,
// };

const dpttt = new Map();
dpttt.set(0, 0);

const x  = coinChange([2], 3);
console.log({x})