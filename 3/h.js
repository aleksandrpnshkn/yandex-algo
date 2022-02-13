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
    const arr = readArray();

    arr.sort((a, b) => {
        if (a + b > b + a) {
            return -1;
        } else if (a + b < b + a) {
            return 1;
        } else {
            return 0;
        }
    });

    process.stdout.write(arr.join('') + '\n');
}

function readArray() {
    const arr = inputLines[curLine].trim().split(' ');
    curLine++;
    return arr;
}
