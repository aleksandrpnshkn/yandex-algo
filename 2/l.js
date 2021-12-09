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

    const mod = 10 ** numberOfDigits;
    const rem = fibMod(Number(traineeIndex), mod);

    process.stdout.write(String(rem));
}

function fibMod(n, mod) {
    let prev = 1;
    let curr = 1;

    for (let i = 2; i <= n; i++) {
        [prev, curr] = [curr, (prev + curr) % mod];
    }

    return curr;
}

function readArray() {
    const arr = inputLines[curLine].trim().split(' ');
    curLine++;
    return arr;
}
