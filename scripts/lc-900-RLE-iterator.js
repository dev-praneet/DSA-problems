/**
 * @param {number[]} encoding
 */
var RLEIterator = function (encoding) {
  this.encoding = encoding;
  this.exhaustedElements = 0;
  this.cumCount = Array.from({ length: encoding.length }, () => null);

  for (let i = 0; i < encoding.length; i += 2) {
    this.cumCount[i] = (this.cumCount[i - 2] || 0) + encoding[i];
  }
};

/**
 * @param {number} n
 * @return {number}
 */
RLEIterator.prototype.next = function (n) {
  debugger;
  const exhaustedElems = this.exhaustedElements;
  this.exhaustedElements += n;

  for (let i = 0; i < this.encoding.length; i += 2) {
    if (exhaustedElems + n <= this.cumCount[i]) {
      return this.encoding[i + 1];
    }
  }

  return -1;
};


//  Your RLEIterator object will be instantiated and called as such:
 var obj = new RLEIterator([3, 8, 0, 9, 2, 5]);
 console.log(
 obj.next(2),
 obj.next(1),
 obj.next(1),
 obj.next(2)
 )
 
