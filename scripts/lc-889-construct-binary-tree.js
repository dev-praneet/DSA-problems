/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function (preorder, postorder) {
  function construct(preOrderStart, preOrderEnd, postOrderStart, postOrderEnd) {
    debugger;
    const root = preorder[preOrderStart];

    // could have checked for postOrder indices as well
    if (preOrderEnd === preOrderStart) {
      return new TreeNode(root);
    }

    const leftPreOStart = preOrderStart + 1;
    const leftPostOStart = postOrderStart;
    const leftPostOEnd = postorder.indexOf(preorder[preOrderStart + 1]);
    const leftPreOEnd = leftPreOStart + leftPostOEnd - leftPostOStart;

    const rightPreOStart = leftPreOEnd + 1;
    const rightPreOEnd = preOrderEnd;
    const rightPostOStart = leftPostOEnd + 1;
    const rightPostOEnd = postOrderEnd - 1;

    const leftSubtree = construct(
      leftPreOStart,
      leftPreOEnd,
      leftPostOStart,
      leftPostOEnd
    );
    // when no right subtree or no left subtree
    // in that case I am taking right subtree as not available
    if (leftPreOEnd === preOrderEnd) {
      return new TreeNode(root, leftSubtree, null);
    }
    const rightSubtree = construct(
      rightPreOStart,
      rightPreOEnd,
      rightPostOStart,
      rightPostOEnd
    );
    return new TreeNode(root, leftSubtree, rightSubtree);
  }

  return construct(0, preorder.length - 1, 0, postorder.length - 1);
};

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

const x = constructFromPrePost([1, 2, 4, 5, 3, 6, 7], [4, 5, 2, 6, 7, 3, 1]);
console.log({x});
