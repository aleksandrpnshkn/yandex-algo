const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', (line) => _inputLines.push(line));

process.stdin.on('end', solve);

function solve() {
    _curLine++;

    const text = readArray();
    let longestWord = '';

    text.forEach((word) => {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    });
    
    process.stdout.write(longestWord + '\n');
    process.stdout.write(String(longestWord.length));
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine]
        .trim(' ')
        .split(' ');

    _curLine++;

    return arr;
}

function readIntArray() {
    return readArray().map(num => Number(num));
}