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
    const traineeIndex = readNumber();

    process.stdout.write(String(fib(traineeIndex)));
}

function fib(n) {
    if (n === 0 || n === 1) {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
