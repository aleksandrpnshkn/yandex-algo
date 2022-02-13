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
    const MAX_SCORE = 255;

    let windowLength = Math.min(scores1.length, scores2.length);
    let l1 = 0;
    let r1 = windowLength - 1;

    while (windowLength) {
        const window1 = scores1.slice(0, windowLength);
        const window2 = scores2.slice(0, windowLength);

        const counter1 = new Array(MAX_SCORE + 1);
        counter1.fill(0);
        window1.forEach((points) => counter1[points]++);

        let sum1 = window1.reduce((sum, score) => sum + score);
        let sum2 = window2.reduce((sum, score) => sum + score);

        do {
            let currSum2 = sum2;
            let l2 = 0;
            let r2 = windowLength - 1;

            const counter2 = new Array(MAX_SCORE + 1);
            counter2.fill(0);
            window2.forEach((score) => counter2[score]++);

            do {
                if (sum1 === currSum2) {
                    let theSame = true;

                    counter1.forEach((times, score) => {
                        if (counter2[score] !== times) {
                            theSame = false;
                        }
                    });

                    if (theSame) {
                        process.stdout.write(String(windowLength) + '\n');
                        return;
                    }
                }

                counter2[scores2[l2]]--;
                currSum2 -= scores2[l2];
                l2++;
                r2++;
                counter2[scores2[r2]] = (counter2[scores2[r2]] || 0) + 1;
                currSum2 += scores2[r2];
            } while (r2 < scores2.length);

            counter1[scores1[l1]]--;
            sum1 -= scores1[l1];
            l1++;
            r1++;
            counter1[scores1[r1]] = (counter1[scores1[r1]] || 0) + 1;
            sum1 += scores1[r1];
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
