// naive solution:

function prevSmaller(A) {
    const res = [-1];
    let j = -1;
    A['-1'] = Number.NEGATIVE_INFINITY;

    outer: for (let i = 1; i < A.length; i++) {
        if (A[i] > A[i - 1]) {
            j = i - 1;
            res.push(j);
            continue;
        }
        
        if (A[i] === A[i - 1]) {
            res.push(j);
            continue;
        }
        
        if ((A[i] < A[i - 1]) && (A[i] > A[j])) {
            res.push(j);
            continue;
        }
        
        if (A[i] <= A[j]) {
            j = j - 1;
        }
        
        for (; j > -1; j--) {
            if (A[j] < A[i]) {
                res.push(j);
                continue outer;
            }
        }
        
        res.push(j);
    }
    
    for (let i = 0; i < res.length; i++) {
        if (~res[i]) {
            res[i] = A[res[i]];
        }
    }
    
    return res;
}

// ###############################################################################
// ###############################################################################

// another solution using stack
function prevSmaller(A) {
    const st = [];
    const res = [];
    
    outer: for (let i = 0; i < A.length; i++) {
        while (st.length) {
            const top = st[st.length - 1];
            
            if (top >= A[i]) {
                st.pop();
            } else {
                res.push(top);
                st.push(A[i]);
                continue outer;
            }
        }
        
        st.push(A[i]);
        res.push(-1);
    }
    
    return res;
}