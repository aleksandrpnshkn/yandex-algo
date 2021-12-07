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

    let leftPos;
    let rightPos;

    for (let pos = 0; pos < houses.length; pos++) {
        if (houses[pos] === 0) {
            leftPos = pos;
            rightPos = undefined;
        }

        if (rightPos === undefined) {
            const fromPos = leftPos !== undefined ? leftPos + 1 : 0;
            rightPos = houses.indexOf(0, fromPos);
        }

        let leftDistance;
        let rightDistance;

        if (leftPos > -1) {
            leftDistance = pos - leftPos;
        }

        if (rightPos > -1) {
            rightDistance = rightPos - pos;
        }

        let smallestDistance;

        if (rightDistance === undefined) {
            smallestDistance = leftDistance;
        } else if (leftDistance === undefined) {
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
