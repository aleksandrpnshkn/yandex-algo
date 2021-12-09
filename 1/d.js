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

    const temps = readArray();
    
    const iMax = temps.length - 1;
    let chaotic = 0;

    for (let i = 0; i < temps.length; i++) {
        if (
            (i === 0 || temps[i-1] < temps[i])
            && (i === iMax || temps[i+1] < temps[i])  
        ) {
            chaotic++;
        }
    }

    process.stdout.write(String(chaotic));
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