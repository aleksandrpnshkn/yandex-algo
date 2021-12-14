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
    const savingsStats = readNumArray();
    const cost = readNumber();
    const needToBuy = 2;
    let bought = 0;

    let neededSavings = cost;

    const daysOfPurchase = [];

    for (let day = 1; day <= savingsStats.length && bought < needToBuy; day++) {
        if (savingsStats[day - 1] >= neededSavings) {
            bought++;
            neededSavings += cost;
            daysOfPurchase.push(day);
        }
    }

    while (daysOfPurchase.length < needToBuy) {
        daysOfPurchase.push(-1);
    }

    process.stdout.write(daysOfPurchase.join(' '));
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readArray() {
    const arr = inputLines[curLine].trim().split(' ');
    curLine++;
    return arr;
}

function readNumArray() {
    return readArray().map((n) => Number(n));
}
