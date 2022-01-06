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
    readNumber();
    const areas = readNumericArray();
    const k = readNumber();

    const diffs = [];

    for (let i = 0; i < areas.length; i++) {
        for (let j = i + 1; j < areas.length; j++) {
            diffs.push(Math.abs(areas[i] - areas[j]));
        }
    }

    bubbleSort(diffs);

    process.stdout.write(String(diffs[k - 1]) + '\n');
}

function bubbleSort(arr) {
    let hasChanges = true;

    while (hasChanges) {
        hasChanges = false;

        for (let i = 1; i < arr.length; i++) {
            if (arr[i-1] > arr[i]) {
                [arr[i-1], arr[i]] = [arr[i], arr[i-1]];
                hasChanges = true;
            }
        }
    }

    return arr;
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readNumericArray() {
    const arr = inputLines[curLine].trim().split(' ').map((num) => Number(num));
    curLine++;
    return arr;
}
