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

    let scores2Index = new Array(MAX_SCORE + 1);

    for (let i = 0; i < scores2Index.length; i++) {
        scores2Index[i] = [];
    }

    scores2.forEach((score, index) => scores2Index[score].push(index));

    let max = 0;

    scores1.forEach((score, pos1) => {
        scores2Index[score].forEach((pos2) => {
            const length = getSequenceLength(scores1, pos1, scores2, pos2);
            max = Math.max(max, length);
        });
    })

    process.stdout.write(String(max) + '\n');
}

function getSequenceLength(arr1, pos1, arr2, pos2) {
    let length = 0;

    while (
        pos1 < arr1.length
        && pos2 < arr2.length
        && arr1[pos1] === arr2[pos2]
    ) {
        length++;
        pos1++;
        pos2++;
    }

    return length;
}

function readNumericArray() {
    const arr = inputLines[curLine].split(' ').map((n) => Number(n));
    curLine++;
    return arr;
}
