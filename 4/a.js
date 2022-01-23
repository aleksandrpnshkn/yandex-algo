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
    const a = readNumber();
    const m = readNumber();
    const str = readString();

    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = (a * hash + str.charCodeAt(i)) % m;
    }

    process.stdout.write(String(hash) + '\n');
}

function readString() {
    const str = inputLines[curLine];
    curLine++;
    return str;
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
