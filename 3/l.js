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
    const savingsStats = readArray();
    const cost = readNumber();
    const needToBuy = 2;

    const neededSavings = [];
    const daysOfPurchase = [];

    for (let i = 1; i <= needToBuy; i++) {
        neededSavings.push(cost * i);
    }

    let prevIndex;

    neededSavings.forEach((needed) => {
        const foundIndex = searchNearestBinary(savingsStats, needed, prevIndex || 0, savingsStats.length);

        if (foundIndex >= 0) {
            daysOfPurchase.push(foundIndex + 1);
        } else {
            daysOfPurchase.push(-1);
        }

        prevIndex = foundIndex;
    });

    process.stdout.write(daysOfPurchase.join(' ') + '\n');
}

function searchNearestBinary(arr, needed, left, right) {
    if (right <= left) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < needed) {
        return searchNearestBinary(arr, needed, mid + 1, right);
    }

    if (arr[mid - 1] !== undefined && arr[mid - 1] >= needed) {
        return searchNearestBinary(arr, needed, left, mid);
    }

    return mid;
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
