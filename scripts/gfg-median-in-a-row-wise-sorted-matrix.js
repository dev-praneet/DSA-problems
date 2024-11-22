//User function Template for javascript
/**
 * @param {number[][]} matrix
 * @param {number} R
 * @param {number} C
 * @returns {number}
*/

class Solution
{
    //Function to find median of the matrix.
    median(matrix, R, C)
    {
        //your code here
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;
        
        for (let i = 0; i < R; i++) {
            if (matrix[i][0] < min) {
                min = matrix[i][0];
            }
            
            if (matrix[i][C-1] > max) {
                max = matrix[i][C-1];
            }
        }
        
        // count of elements less than or equal to num
        // so it is slightly different for the general case of finding
        // some specific element. here we are trying to find the count
        // of elements less than or equal to a given number in a sorted
        // array
        function getCount(num) {
            // the template used broadly follows the general template
            // the difference is with the case of === comparison placement
            // the fact that we are reading left for the result does not mean that
            // left is special because right = left - 1 when the loop breaks
            let count = 0;
            
            
            for (let i = 0; i < R; i++) {
                let left = 0;
                let right = C - 1;
                
                while (left <= right) {
                    const mid = Math.floor(left + (right - left) / 2);
                    
                    // the point of divergence from the general template
                    // loop is not broken when some equality condition is met
                    // and this is the point that ensures that if the final result
                    // which is left in this case will never be some value which
                    // doesn't exist in the matrix
                    if (matrix[i][mid] <= num) {
                        left = mid + 1;
                    }
                    
                    if (matrix[i][mid] > num) {
                        right = mid - 1;
                    }
                }
                
                count += left;
            }
            
            return count;
        }
        
        const requiredCount = Math.ceil(R * C / 2);
        let left = min;
        let right = max;

        // again this is slightly different from another case mentioned
        // above. here we are trying to find a number in a range for which
        // getCount(num) >= requiredCount and that number should also exist
        // in a matrix. so we can't just break the loop early when getCount(num)
        //  === requiredCount.
        // notice again the placement of === operator, it is different
        // from another case above
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            const count = getCount(mid);
            
            
            if (count < requiredCount) {
                left = mid + 1;
            }
            
            if (count >= requiredCount) {
                right = mid - 1;
            }
        }
        
        return left;
    }
}
