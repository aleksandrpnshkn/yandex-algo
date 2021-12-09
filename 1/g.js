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
    const a = readString();
    const b = readString();
    
    let sum = '';
    let rem = 0;

    for (let i = 1; i <= Math.max(a.length, b.length); i++) {
        let d1 = Number(a[a.length - i] || 0);
        let d2 = Number(b[b.length - i] || 0);

        let curSum = d1 + d2 + rem;
        let digit = curSum % 2;
        
        if (curSum > 1) {
            rem = 1;
        } else { 
            rem = 0;
        }
        
        sum = digit + sum;
    }

    if (rem) {
        sum = rem + sum;
    }

    process.stdout.write(sum);
}

function readString() {
    const s = _inputLines[_curLine];
    _curLine++;
    return s;
}