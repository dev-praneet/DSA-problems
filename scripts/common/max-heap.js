export class MaxHeapCustomInput {
    heap = [null]
    
    insert([val, i, j]) {
        this.heap.push([val, i, j]);
        
        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);
        
        while (Math.floor(currentIndex / 2) > 0) {
            parentIndex = Math.floor(currentIndex / 2);
            
            if (this.heap[parentIndex] < this.heap[currentIndex]) {
                const temp = this.heap[currentIndex];
                this.heap[currentIndex] = this.heap[parentIndex];
                this.heap[parentIndex] = temp;
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }
    
    extractMax() {
        if (this.heap.length === 1) {
            return null;
        }

        const res = this.heap[1];

        if (this.heap.length === 2) {
            this.heap.splice(-1, 1);
            return res;
        }
        
        
        this.heap[1] = this.heap.splice(-1, 1)[0];
        
        let currentIndex = 1;
        let leftChildIndex = currentIndex * 2;
        let rightChildIndex = leftChildIndex + 1;
        
        while ((currentIndex * 2) < this.heap.length) {
            leftChildIndex = currentIndex * 2;
            rightChildIndex = leftChildIndex + 1;
            
            if (rightChildIndex < this.heap.length) {
                if ((this.heap[currentIndex][0] >= this.heap[leftChildIndex][0]) &&
                    (this.heap[currentIndex][0] >= this.heap[rightChildIndex][0])) {
                    break;
                }
                
                let maxIndex = leftChildIndex;
                
                if (this.heap[rightChildIndex][0] > this.heap[leftChildIndex][0]) {
                    maxIndex = rightChildIndex;
                }
                
                const temp = this.heap[currentIndex];
                this.heap[currentIndex] = this.heap[maxIndex];
                this.heap[maxIndex] = temp;
                currentIndex = maxIndex;
            } else {
                // only left child is available
                if (this.heap[leftChildIndex][0] > this.heap[currentIndex][0]) {
                    const temp = this.heap[currentIndex];
                    this.heap[currentIndex] = this.heap[leftChildIndex];
                    this.heap[leftChildIndex] = temp;
                    currentIndex = leftChildIndex;
                } else {
                    break;
                }
            }
        }
        
        return res;
    }
}

class MaxHeap {
    heap = [null]
    
    insert(val) {
        this.heap.push(val);
        
        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);
        
        while (Math.floor(currentIndex / 2) > 0) {
            parentIndex = Math.floor(currentIndex / 2);
            
            if (this.heap[parentIndex] < this.heap[currentIndex]) {
                const temp = this.heap[currentIndex];
                this.heap[currentIndex] = this.heap[parentIndex];
                this.heap[parentIndex] = temp;
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }
    
    extractMax() {
        if (this.heap.length === 1) {
            return null;
        }

        const res = this.heap[1];

        if (this.heap.length === 2) {
            this.heap.splice(-1, 1);
            return res;
        }
        
        
        this.heap[1] = this.heap.splice(-1, 1)[0];
        
        let currentIndex = 1;
        let leftChildIndex = currentIndex * 2;
        let rightChildIndex = leftChildIndex + 1;
        
        while ((currentIndex * 2) < this.heap.length) {
            leftChildIndex = currentIndex * 2;
            rightChildIndex = leftChildIndex + 1;
            
            if (rightChildIndex < this.heap.length) {
                if ((this.heap[currentIndex] >= this.heap[leftChildIndex]) &&
                    (this.heap[currentIndex] >= this.heap[rightChildIndex])) {
                    break;
                }
                
                let maxIndex = leftChildIndex;
                
                if (this.heap[rightChildIndex] > this.heap[leftChildIndex]) {
                    maxIndex = rightChildIndex;
                }
                
                const temp = this.heap[currentIndex];
                this.heap[currentIndex] = this.heap[maxIndex];
                this.heap[maxIndex] = temp;
                currentIndex = maxIndex;
            } else {
                // only left child is available
                if (this.heap[leftChildIndex] > this.heap[currentIndex]) {
                    const temp = this.heap[currentIndex];
                    this.heap[currentIndex] = this.heap[leftChildIndex];
                    this.heap[leftChildIndex] = temp;
                    currentIndex = leftChildIndex;
                } else {
                    break;
                }
            }
        }
        
        return res;
    }
}
