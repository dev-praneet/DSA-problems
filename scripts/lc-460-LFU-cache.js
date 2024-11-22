/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
    this.capacity = capacity;
    this.data = {};
    // its next will give the most used key
    this.left = new LLNode();
    // it prev will give the list used key
    this.right = new LLNode();
    this.left.next = this.right;
    this.right.prev = this.left;
    // this.lastUpdated = null;
    this.usedCapacity = 0;
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
    if (key in this.data) {
        this.increaseUseCount(this.data[key]);
        return this.data[key].value;
    }

    return this.data[key] ?? -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
    if (key in this.data) {
        const current = this.data[key];
        current.value = value;
        this.increaseUseCount(this.data[key]);
    } else {
        if (this.usedCapacity === this.capacity) {
            this.removeLeastUsed();
            const newNode = new LLNode(key, value);
            this.data[key] = newNode;
            this.insert(newNode);
        } else {
            const newNode = new LLNode(key, value);
            this.data[key] = newNode;
            this.insert(newNode);
            this.usedCapacity++;
        }
    }
};

LFUCache.prototype.increaseUseCount = function(node) {
    // add code here
    node.useCount++;

    let moveAfter = node.prev;

    while ((moveAfter !== this.left) && (node.useCount >= moveAfter.useCount)) {
        moveAfter = moveAfter.prev;
    }

    if (this.usedCapacity > 1) {
        const nodePrev = node.prev;
        const nodeNext = node.next;
        nodePrev.next = nodeNext;
        nodeNext.prev = nodePrev;

        const moveAfterNext = moveAfter.next;
        node.next = moveAfterNext;
        moveAfterNext.prev = node;

        moveAfter.next = node;
        node.prev = moveAfter;
    }

    // while (node.prev && (node.prev !== this.left) && (node.useCount >= node.prev.useCount)) {
    //     // switch the two
    //     const prev = node.prev;
    //     const prevPrev = prev.prev;
    //     const next = node.next;

    //     node.prev = prevPrev;
    //     prevPrev.next = node;

    //     node.next = prev;
    //     prev.prev = node;

    //     prev.next = next;
    //     next.prev = prev;
    // }
}

LFUCache.prototype.removeLeastUsed = function() {
    // add code here
    const node = this.right.prev;

    if (node !== this.left) {
        const next = node.next;
        const prev = node.prev;

        prev.next = next;
        next.prev = prev;

        delete this.data[node.key];
    }
}

LFUCache.prototype.insert = function(node) {
    // add code here
    let insertAfter = this.right.prev;

    while (insertAfter && (insertAfter !== this.left) && (node.useCount >= insertAfter.useCount)) {
        insertAfter = insertAfter.prev;
    }

    const next = insertAfter.next;
    insertAfter.next = node;
    node.prev = insertAfter;

    node.next = next;
    next.prev = node;
}

/** 
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

class LLNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
        this.useCount = 1;
    }
}


// #################################################################################################
// second solution
/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
    this.capacity = capacity;
    this.data = {};
    this.freqToNodes = {};
    this.usedCapacity = 0;
    this.minFreq = 1;
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
    if (key in this.data) {
        this.updateFrequency(this.data[key]);
        return this.data[key].value;
    }

    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
    if (key in this.data) {
        this.data[key].value = value;
        this.updateFrequency(this.data[key]);
    } else {
        if (this.usedCapacity === this.capacity) {
            // remove the least frequently used node
            // which is least recent
            this.removeNode();
            this.addNode(key, value);
        } else {
            this.addNode(key, value);
            this.usedCapacity++;
        }
    }
};

LFUCache.prototype.updateFrequency = function(node) {
    console.log({node});
    const freq = node.freq;

    // remove node for the ll for old frequency
    const [left, right] = this.freqToNodes[freq];
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;

    if (left.next === right) {
        delete this.freqToNodes[freq];

        if (this.minFreq === freq) {
            this.minFreq++;
        }
    }

    // add the node to the ll for new frequency
    const newFreq = freq + 1;
    node.freq = newFreq;

    if (newFreq in this.freqToNodes) {
        // if in this block, at least one node certainly
        // exists in this LL
        const [left, right] = this.freqToNodes[newFreq];
        const next = left.next;
        left.next = node;
        node.prev = left;

        node.next = next;
        next.prev = node;
    } else {
        const newLL = new LL(node);
        this.freqToNodes[newFreq] = [newLL.left, newLL.right];
    }
}

LFUCache.prototype.removeNode = function() {
    const [left, right] = this.freqToNodes[this.minFreq];
    const nodeToRemove = right.prev;
    nodeToRemove.prev.next = right;
    right.prev = nodeToRemove.prev;

    if (left.next === right) {
        delete this.freqToNodes[this.minFreq];
        // this.minFreq will be updated while adding the new node
    }

    delete this.data[nodeToRemove.key];
}

LFUCache.prototype.addNode = function(key, value) {
    const newNode = new LLNode(key, value);
    this.data[key] = newNode;

    if (1 in this.freqToNodes) {
        const [left, right] = this.freqToNodes[1];
        const next = left.next;
        left.next = newNode;
        newNode.prev = left;

        newNode.next = next;
        next.prev = newNode;
    } else {
        const {left, right} = new LL(newNode);
        this.freqToNodes[1] = [left, right];
    }

    this.minFreq = 1;
}

/** 
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

class LLNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
        this.freq = 1;
    }
}

class LL {
    constructor(node) {
        this.left = new LLNode();
        this.right = new LLNode();

        this.left.next = node;
        node.prev = this.left;

        node.next = this.right;
        this.right.prev = node;
    }
}
