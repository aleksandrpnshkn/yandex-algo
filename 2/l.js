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
    const [traineeIndex, numberOfDigits] = readArray();

    const numberOfCommits = fib(traineeIndex);
    const rem = numberOfCommits % (10 ** numberOfDigits);

    process.stdout.write(String(rem));
}

function fib(n) {
    if (n === 0 || n === 1) {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
}

function readArray() {
    const arr = inputLines[curLine].trim().split(' ');
    curLine++;
    return arr;
}
