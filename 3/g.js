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
    const length = readNum();

    if (length < 1) {
        return;
    }

    const arr = readNumericArray();
    countingSort(arr, 3);
    process.stdout.write(arr.join(' ') + '\n');
}

function countingSort(arr, k) {
    const counter = new Array(k);
    counter.fill(0);

    arr.forEach((value) => {
        counter[value]++;
    });

    let j = 0;

    counter.forEach((count, value) => {
        for (let i = 0; i < count; i++, j++) {
            arr[j] = value;
        }
    });
}

function readNum() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readNumericArray() {
    const arr = inputLines[curLine].trim().split(' ').map((num) => Number(num));
    curLine++;
    return arr;
}
