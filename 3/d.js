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
    readNumber();
    const greeds = readNumericArray();
    readNumber();
    const cookieSizes = readNumericArray();

    greeds.sort((a, b) => a - b);
    cookieSizes.sort((a, b) => a - b);

    let lastCookieIndex = -1;
    let satisfiedCounter = 0;

    greeds.forEach((greed) => {
        for (let i = lastCookieIndex + 1; i <= cookieSizes.length; i++) {
            if (greed <= cookieSizes[i]) {
                lastCookieIndex = i;
                satisfiedCounter++;
                break;
            }
        }
    });

    process.stdout.write(String(satisfiedCounter) + '\n');
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readNumericArray() {
    const arr = inputLines[curLine].trim().split(' ').map((num) => Number(num));
    curLine++;
    return arr;
}
