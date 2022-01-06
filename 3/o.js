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

    let diffsCounter = {};

    for (let i = 0; i < areas.length; i++) {
        for (let j = i + 1, m = 0; j < areas.length && m <= k; j++, m++) {
            const diff = Math.abs(areas[i] - areas[j]);

            if (diffsCounter[diff] === undefined) {
                diffsCounter[diff] = 0;
            }

            diffsCounter[diff]++;
        }
    }

    diffsCounter = Object.entries(diffsCounter);
    diffsCounter = diffsCounter.sort((a, b) => a[0] - b[0]);

    let acc = 0;

    for (let i = 0; i < diffsCounter.length; i++) {
        acc += diffsCounter[i][1];

        if (acc >= k) {
            process.stdout.write(String(diffsCounter[i][0]) + '\n');
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
