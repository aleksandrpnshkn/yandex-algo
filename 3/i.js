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
    const universitiesIds = readNumericArray();
    const numberOfUniversitiesToPrint = readNumber();

    let counter = {};

    universitiesIds.forEach((id) => {
        if (counter[id] === undefined) {
            counter[id] = 0;
        }

        counter[id]++;
    });

    counter = Object.entries(counter);

    // order by count desc, id asc
    counter.sort((a, b) => b[1] - a[1] || a[0] - b[0]);

    process.stdout.write(counter.map((info) => info[0]).slice(0, numberOfUniversitiesToPrint).join(' ') + '\n');
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
