const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

let inputLines = [];
let curLine = 0;

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    readNumber();
    const areas = readNumericArray();
    const k = readNumber();
    const MAX_AREA = 1000000;

    let diffsCounter = new Array(MAX_AREA);
    diffsCounter.fill(0);

    for (let i = 0; i < areas.length; i++) {
        for (let j = i + 1; j < areas.length; j++) {
            diffsCounter[Math.abs(areas[i] - areas[j])]++;
        }
    }

    let acc = 0;

    for (let i = 0; i < diffsCounter.length; i++) {
        acc += diffsCounter[i];

        if (acc >= k) {
            process.stdout.write(String(i) + '\n');
            return;
        }
    }
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
