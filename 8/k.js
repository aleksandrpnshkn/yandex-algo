const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const inputLines = [];
let currLine = 0;

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    const a = readString().split('').filter(isEvenChar).join('');
    const b = readString().split('').filter(isEvenChar).join('');

    if (a < b) {
        process.stdout.write('-1\n');
    } else if (a > b) {
        process.stdout.write('1\n');
    } else {
        process.stdout.write('0\n');
    }
}

function isEvenChar(char) {
    return char.charCodeAt(0) % 2 === 0;
}

function readString() {
    const str = inputLines[currLine];
    currLine++;
    return str;
}
