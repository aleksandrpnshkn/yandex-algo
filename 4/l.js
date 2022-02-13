const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const inputLines = [];
let curLine = 0;

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    curLine++;
    const scores1 = readNumericArray();
    curLine++;
    const scores2 = readNumericArray();

    let windowLength = Math.min(scores1.length, scores2.length);
    let l1 = 0;
    let r1 = windowLength - 1;

    while (windowLength) {
        let sum1 = scores1.slice(0, windowLength).reduce((sum, score) => sum + score);
        let sum2 = scores2.slice(0, windowLength).reduce((sum, score) => sum + score);

        do {
            let currSum2 = sum2;
            let l2 = 0;
            let r2 = windowLength - 1;

            do {
                if (sum1 === currSum2) {
                    console.log(l1, r1, sum1, l2, r2, currSum2)
                    process.stdout.write(String(windowLength) + '\n');
                    return;
                }

                l2++;
                r2++;
                currSum2 = currSum2 - scores2[l2-1] + scores2[r2];
            } while (r2 < scores2.length);

            l1++;
            r1++;
            sum1 = sum1 - scores1[l1-1] + scores1[r1];
        } while (r1 < scores1.length);

        windowLength--;
        r1 = windowLength - 1;
        l1 = 0;
    }

    process.stdout.write('0\n');
}

function readNumericArray() {
    const arr = inputLines[curLine].split(' ').map((n) => Number(n));
    curLine++;
    return arr;
}
