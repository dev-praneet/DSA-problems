function main(input) {
    let input = readLine();
    let [n, m] = input.split(' ');
    m = +m;
    n = +n;

    let left = 1;
    let right = m;


    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        const value = Math.pow(mid, n);

        if (value === m) {
            console.log(mid);
            return mid;
        }

        if (value < m) {
            left = mid + 1;
        }

        if (value > m) {
            right = mid - 1;
        }
    }

    console.log(-1);
    return -1;
}

const x = main('4 69');
console.log({x});
