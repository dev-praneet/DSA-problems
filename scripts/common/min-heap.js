export class MinHeap {
    heap = [null]

    insert(val) {
        this.heap.push(val);
        let idx = this.heap.length - 1;

        while (true) {
            let parent = Math.floor(idx / 2);

            if (parent < 1) {
                break;
            }

            if (this.heap[parent] > this.heap[idx]) {
                const temp = this.heap[parent];
                this.heap[parent] = this.heap[idx];
                this.heap[idx] = temp;
                idx = parent;
            } else {
                break;
            }
        }
    }

    extractMin() {
        if (this.heap.length === 1) {
            return null;
        }

        const min = this.heap[1];

        const last = this.heap.pop();

        if (this.heap.length === 1) {
            return min;
        }

        this.heap[1] = last;

        let currentIndex = 1;

        while (true) {
            let leftIndex = currentIndex * 2;
            let rightIndex = currentIndex * 2 + 1;

            if (leftIndex in this.heap) {
                if (rightIndex in this.heap) {
                    if ((this.heap[leftIndex] < this.heap[currentIndex]) && (this.heap[leftIndex] <= this.heap[rightIndex])) {
                        const temp = this.heap[currentIndex];
                        this.heap[currentIndex] = this.heap[leftIndex];
                        this.heap[leftIndex] = temp;
                        currentIndex = leftIndex;
                        continue;
                    } else{
                        if ((this.heap[rightIndex] < this.heap[currentIndex]) && (this.heap[rightIndex] <= this.heap[leftIndex])) {
                            const temp = this.heap[currentIndex];
                            this.heap[currentIndex] = this.heap[rightIndex];
                            this.heap[rightIndex] = temp;
                            currentIndex = rightIndex;
                            continue;
                        } else {
                            break;
                        }
                    } 
                } else {
                    if (this.heap[leftIndex] < this.heap[currentIndex]) {
                        const temp = this.heap[currentIndex];
                        this.heap[currentIndex] = this.heap[leftIndex];
                        this.heap[leftIndex] = temp;
                        currentIndex = leftIndex;
                        continue;
                    } else {
                        break;
                    }
                }
            } else {
                break;
            }
        }

        return min;
    }
}

// const x = new MinHeap();

// [7, 10, 5, 3].forEach(val => x.insert(val));
// const y = x.extractMin();

// console.log({heap: x.heap, y, z, a, b, c});
