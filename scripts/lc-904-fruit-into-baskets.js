/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  const frequencyList = [];

  let first = null;
  let second = null;
  let thisElementFreqCount = 1;
  debugger;
  for (let i = 0; i < fruits.length; i++) {
    if (i >= 2) {
        if (fruits[i - 1] === fruits[i - 2]) {
            thisElementFreqCount++;
        } else {
            thisElementFreqCount = 1;
        }
    }

    if (first === null) {
      first = fruits[i];
      frequencyList.push(1);
      continue;
    }

    if (fruits[i] === first) {
      frequencyList[frequencyList.length - 1] += 1;
      continue;
    }

    if (second === null) {
      second = fruits[i];
      frequencyList[frequencyList.length - 1] += 1;
      continue;
    }

    if (fruits[i] === second) {
      frequencyList[frequencyList.length - 1] += 1;
      continue;
    }

    frequencyList.push(thisElementFreqCount + 1);
    first = fruits[i-1];
    second = fruits[i];
  }

  let largest = 0;

  for (let i = 0; i < frequencyList.length; i++) {
    const x = frequencyList[i];

    if (x > largest) {
      largest = x;
    }
  }

  return largest;
};

const x = totalFruit([0, 1, 2, 2]);
console.log({x});
