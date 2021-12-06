// ID успешной посылки 60103223

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
    curLine++;
    const houses = readIntArray();
    const distances = [];

    let leftPos = null;
    let rightPos = null;

    for (let pos = 0; pos < houses.length; pos++) {
        if (houses[pos] === 0) {
            leftPos = pos;
            rightPos = null;
        }

        if (rightPos === null) {
            const fromPos = leftPos !== null ? leftPos + 1 : 0;
            rightPos = houses.indexOf(0, fromPos);
        }

        let leftDistance = null;
        let rightDistance = null;

        if (leftPos !== null) {
            leftDistance = pos - leftPos;
        }

        if (rightPos > -1) {
            rightDistance = rightPos - pos;
        }

        let smallestDistance = null;

        if (rightDistance === null) {
            smallestDistance = leftDistance;
        } else if (leftDistance === null) {
            smallestDistance = rightDistance;
        } else {
            smallestDistance = Math.min(leftDistance, rightDistance);
        }

        distances.push(smallestDistance);
    }

    process.stdout.write(distances.join(' '));
}

function readIntArray() {
    const arr = inputLines[curLine]
        .trim()
        .split(' ')
        .map((str) => Number(str));

    curLine++;

    return arr;
}
