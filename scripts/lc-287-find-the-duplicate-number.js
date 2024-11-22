/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  // my first solution

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (!~num) {
      continue;
    }

    let currentIndex = nums[i];

    while (true) {
      if (currentIndex === i) {
        nums[currentIndex] = -1;
        break;
      }

      const tempIndex = nums[currentIndex];

      if (nums[currentIndex] === -1) {
        return currentIndex;
      }

      nums[currentIndex] = -1;
      currentIndex = tempIndex;
    }
  }
};

// 2nd solution using linked list: slow and fast pointers
/**
 * 
 * @point 1: iteration will not be stuck at any point because of self loop or something like that
 * because the starting point of nums[0] is not can never have the value of 0 and if there is any
 * loop after that wheter self-loop or any other loop, it means that we have found the solution 
 * @point 2: 2f = f + nc + x (twice of distance travelled by slow pointer is equal to the distance
 * travelled by fast pointer)
 * => f = nc + x and that's why in the second phase slow and fast pointer meet at the start of the
 * circle
 */
var findDuplicate = function (nums) {
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];

  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
};
