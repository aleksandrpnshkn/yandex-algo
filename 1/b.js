const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', (line) => _inputLines.push(line));

process.stdin.on('end', solve);

function solve() {
    const numbers = readArray();

    const remSum = numbers
        .map((num) => Math.abs(num % 2))
        .reduce((remSum, rem) => remSum + rem, 0);

    const res = remSum === 3 || remSum === 0
        ? 'WIN'
        : 'FAIL';

    process.stdout.write(res);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine]
        .trim(' ')
        .split(' ')
        .map(num => Number(num));

    return arr;
}
