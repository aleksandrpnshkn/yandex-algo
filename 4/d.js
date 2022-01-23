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
    const clubsCount = readNumber();
    const clubs = new Set(inputLines.slice(1, clubsCount + 1));

    clubs.forEach((club) => process.stdout.write(club + '\n'));
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
