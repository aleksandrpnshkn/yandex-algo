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
    const minN = 1;
    const maxN = readNumber();

    process.stdout.write(String(countPossibleTreeCombs(minN, maxN)) + '\n');
}

function countPossibleTreeCombs(minN, maxN) {
    if (maxN === minN) {
        return 1;
    }

    let combsCounter = 0;

    for (let n = minN; n <= maxN; n++) {
        let leftCombsCounter = 1;
        let rightCombsCounter = 1;

        if (n > minN) {
            leftCombsCounter = countPossibleTreeCombs(minN, n - 1);
        }

        if (n < maxN) {
            rightCombsCounter = countPossibleTreeCombs(n + 1, maxN);
        }

        combsCounter += leftCombsCounter * rightCombsCounter;
    }

    return combsCounter;
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
