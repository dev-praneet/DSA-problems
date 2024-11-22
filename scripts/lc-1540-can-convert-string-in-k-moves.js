/**
 * @param {string} s
 * @param {string} t
 * @param {number} k
 * @return {boolean}
 */
var canConvertString = function (s, t, k) {
  if (s.length !== t.length) {
    return false;
  }

  const usedSteps = Array.from({ length: 26 }, () => 0);

  for (let i = 0; i < s.length; i++) {
    debugger;
    if (s[i] !== t[i]) {
      let diff = alphaIndex[t[i]] - alphaIndex[s[i]];
      if (diff < 0) {
        diff += 26;
      }

      if (usedSteps[diff - 1] * 26 + diff > k) {
        return false;
      } else {
        usedSteps[diff - 1] += 1;
      }
    }
  }

  return true;
};

const alphaIndex = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
};

const x = canConvertString("abc", "bcd", 10);
console.log({ x });
