function generateTree(nums) {
  if (nums.length === 0) {
    return null;
  }

  const initialNode = new TreeNode(nums[0]);
  const queue = [initialNode];
  let i = 0;

  while (queue.length) {
    const currNode = queue.shift();
    i++;
    if (i === nums.length) {
      break;
    }

    if (nums[i] !== null) {
      currNode.left = new TreeNode(nums[i]);
      queue.push(currNode.left);
    }

    i++;
    if (i === nums.length) {
      break;
    }

    if (nums[i] !== null) {
      currNode.right = new TreeNode(nums[i]);
      queue.push(currNode.right);
    }
  }

  return initialNode;
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// const two = new TreeNode(2);
// const three = new TreeNode(3, two);
// const one = new TreeNode(1);
// const four = new TreeNode(4, one, three);

var largestCombination = function (candidates) {
  const bitCount = Array.from({ length: 32 }, () => 0);
  let largest = 0;

  for (let i = 0; i < bitCount.length; i++) {
    for (const num of candidates) {
      if ((num & (1 << i)) !== 0) {
        bitCount[i]++;
      }
    }

    if (bitCount[i] > largest) {
      largest = bitCount[i];
    }
  }
  debugger;
  return largest;
};

const a = largestCombination([16, 17, 71, 62, 12, 24, 14]);

console.log("a: ", a);
