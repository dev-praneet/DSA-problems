/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head) {
    if (head === null) {
        return null;
    }

    let current = head;
    const myStack = [];

    while (current !== null) {
        myStack.push(current);
        current = current.next;
    }

    // create the cloned list without the random value
    const lastNode = myStack.pop();
    
    let clonedLastNode = new _Node(lastNode.val, null);

    while (myStack.length !== 0) {
        const node = myStack.pop();
        clonedLastNode = new _Node(node.val, clonedLastNode);
    }
    console.log({clonedLastNode});

    // interleave the cloned node between the original nodes in a ll
    current = head;
    clonedCurrent = clonedLastNode;
    let nextClonedCurrent = null;

    while (current !== null) {
        const nextCurrent = current.next;
        current.next = clonedCurrent;
        clonedCurrent = clonedCurrent.next;
        current.next.next = nextCurrent;
        current = nextCurrent;
    }

    // associate the correct value of random with each node
    current = head;

    while (current !== null) {
        current.next.random = current.random?.next || null;
        current = current.next.next;
    }

    // separate the interleaved linked lists
    current = head;
    clonedCurrent = head.next;
    const res = head.next;

    while (current !== null) {
        current.next = clonedCurrent.next;
        clonedCurrent.next = current.next?.next || null;
        current = current.next;
        clonedCurrent = clonedCurrent.next;
    }

    return res;
};

  function _Node(val, next, random) {
     this.val = val;
     this.next = next;
     this.random = random;
  };


//   point to note - it was not required to create a stack first to clone the linked list
// since anyway after that I am interleaving it with the original linked list, I could have used the 
// next node in the original linked list as the next node