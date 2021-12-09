const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', (line) => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    _curLine++;
    const xArr = readArray();
    const kNum = readInt();
    const xNum = Number(xArr.join(''));

    process.stdout.write(String(xNum + kNum).split('').join(' '));
}

function readArray() {
    const arr = _inputLines[_curLine]
        .trim(' ')
        .split(' ');

    _curLine++;

    return arr;
}

function readInt() {
    const num = Number(_inputLines[_curLine]);

    _curLine++;

    return num;
}