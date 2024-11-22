function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    // Calculate the middle index
    let mid = Math.floor(left + (right - left) / 2);

    // Check if the mid element is the target
    if (array[mid] === target) {
      return mid; // Found target, return index
    }

    // If target is greater, ignore left half
    if (array[mid] < target) {
      left = mid + 1;
    }
    // If target is smaller, ignore right half
    else {
      right = mid - 1;
    }
  }

  // If we exit the loop, the target wasn't found
  return -1;
}
