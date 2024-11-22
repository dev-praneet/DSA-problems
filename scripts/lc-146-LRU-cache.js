/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.data = {};

    this.mostRecent = null;
    this.leastRecent = null;
    this.length = 0;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (key in this.data) {
        const value = this.data[key].value;

        this.updateRecent(key, value);

        return value;
    }

    return -1;
};

LRUCache.prototype.updateRecent = function(key, value) {
    const current = this.data[key];

    if (current === this.leastRecent) {
        if (this.leastRecent.prev) {
            this.leastRecent = this.leastRecent.prev;
        }
    }

    const prev = current.prev;
    const next = current.next;

    if (prev !== null) {
        current.next = this.mostRecent;
        current.prev = null;
        this.mostRecent.prev = current;
        prev.next = next;
        this.mostRecent = current;

        if (next !== null) {
            next.prev = prev;
        }
    }
}

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (key in this.data) {
        const current = this.data[key];
        current.value = value;
        this.updateRecent(key, value);

    } else {
        if (this.length === this.capacity) {
            if (this.capacity === 0) {
                return;
            }
            
            // update this.leastRecent
            if (this.leastRecent !== null) {
                const leastRecentKey = this.leastRecent.key;
                if (this.leastRecent.prev !== null) {
                    this.leastRecent = this.leastRecent.prev;
                } else {
                    // this is the only element in data if code reaches this block
                    this.leastRecent = null;
                }

                if (this.leastRecent) {
                    this.leastRecent.next = null;
                }

                delete this.data[leastRecentKey];
            }

            // update this.mostRecent - in case the capacity is 1
            if (this.capacity === 1) {
                this.mostRecent = null;
            }
        } else {
            this.length++;
        }

        this.data[key] = new LLNode(key, value);
        this.data[key].next = this.mostRecent;
        if (this.mostRecent) {
            this.mostRecent.prev = this.data[key];
        }
        this.mostRecent = this.data[key];

        if (this.leastRecent === null) {
            this.leastRecent = this.mostRecent;
        }
    }
};

class LLNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */


const a = ["LRUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"];

const b = [[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]];

let x;

a.forEach((comm, index) => {
    if (comm === 'LRUCache') {
        x = new LRUCache(b[index][0]);
    } else {
        x[comm](...b[index]);
    }
})
