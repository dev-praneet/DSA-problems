var StockSpanner = function () {
  this.stockList = [];
  // this.lastStockSpan = ;
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  let span = 1;
debugger;
  for (let i = this.stockList.length - 1; i >= 0; i--) {
    if (this.stockList[i] <= price) {
      span += 1;
    } else {
        break;
    }
  }

  this.stockList.push(price);

  return span;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
var obj = new StockSpanner();
[100, 80, 60, 70, 60, 75, 85].forEach(price => {
    console.log(obj.next(price));
});