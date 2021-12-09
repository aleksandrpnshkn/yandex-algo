const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', (line) => _inputLines.push(line));

process.stdin.on('end', solve);

function solve() {
    const n = readInt();
    const m = readInt();

    const matrix = [];

    while (matrix.length < n) {
        const row = readArray();
        matrix.push(row);
    }

    const y = readInt();
    const x = readInt();

    let neighbours = [];

    if (y - 1 >= 0) {
        neighbours.push(matrix[y - 1][x]);
    }

    if (x + 1 < m) {
        neighbours.push(matrix[y][x + 1]);
    }

    if (y + 1 < n) {
        neighbours.push(matrix[y + 1][x]);
    }

    if (x - 1 >= 0) {
        neighbours.push(matrix[y][x - 1]);
    }

    neighbours.sort((a, b) => a - b);

    process.stdout.write(neighbours.join(' '));
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

    _curLine++;

    return arr;
}