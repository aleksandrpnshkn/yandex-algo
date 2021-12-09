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

const cache = {};

function fibMod(n, mod, acc = 0) {
    if (n === 0 || n === 1) {
        return 1;
    }

    if (cache[n]) {
        return cache[n];
    }

    return cache[n] = (fibMod(n - 1, mod) + fibMod(n - 2, mod)) % mod;
}

function readArray() {
    const arr = inputLines[curLine].trim().split(' ');
    curLine++;
    return arr;
}
