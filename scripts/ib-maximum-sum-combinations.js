import { MaxHeap } from './common/max-heap.js';

function maxSumCombinations(A, B, C){
    A.sort((a, b) => b - a);
    B.sort((a, b) => b - a);
    
    const heap = new MaxHeap();
    const visited = new Set(['0-0']);
    
    const res = [];
    
    heap.insert([A[0] + B[0], 0, 0]);
    // console.log({heap});
    
    while (C > 0) {
        debugger;
        // console.log({heap});
        const [val, i, j] = heap.extractMax();
        res.push(val);
        
        const key1 = `${i}-${j+1}`;
        
        if (!visited.has(key1)) {
            heap.insert([A[i] + B[j+1], i, j+1]);
            visited.add(key1);
        }
        
        const key2 = `${i+1}-${j}`;
        
        if (!visited.has(key2)) {
            heap.insert([A[i+1] + B[j], i+1, j]);
            visited.add(key2);    
        }
        
        C--;
    }
    
    return res;
}

const A = [ 59, 63, 65, 6, 46, 82, 28, 62, 92, 96, 43, 28, 37, 92, 5, 3, 54, 93, 83 ];
const B = [ 59, 63, 65, 6, 46, 82, 28, 62, 92, 96, 43, 28, 37, 92, 5, 3, 54, 93, 83 ];
const C = 10;

const x = maxSumCombinations(A, B, C);
console.log({x});
