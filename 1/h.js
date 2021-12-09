const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin,
});

let _inputLines = [];
let _curLine = 0

_reader.on('line', (line) => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    let n = readNumber();

    while (n > 1 && Math.round(n) === n) {
        n /= 4;
    }

    process.stdout.write(n === 1 ? 'True' : 'False');
}

function readString() {
    const s = _inputLines[_curLine];
    _curLine++;
    return s;
}

function readNumber() {
    return Number(readString());
}