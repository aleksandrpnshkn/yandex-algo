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
    let [numberOfHouses, availableMoney] = readNumericArray();
    const housesCosts = readNumericArray();

    housesCosts.sort((a, b) => a - b);

    let counter = 0;

    for (let i = 0; i < housesCosts.length; i++) {
        if (housesCosts[i] > availableMoney) {
            break;
        }

        availableMoney -= housesCosts[i];
        counter++;
    }

    process.stdout.write(String(counter) + '\n');
}

function readNumericArray() {
    const arr = inputLines[curLine].trim().split(' ').map((num) => Number(num));
    curLine++;
    return arr;
}
