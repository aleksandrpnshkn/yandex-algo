const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const inputLines = [];
let currLine = 0;

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    const daysCount = readNumber();
    const prices = readNumberArray();

    if (daysCount === 0) {
        process.stdout.write('0\n');
        return;
    }

    let stock;
    let profit = 0;

    for (let day = 0; day < daysCount; day++) {
        let todayPrice = prices[day];
        let tomorrowPrice = prices[day + 1];

        if (stock === undefined) {
            if (tomorrowPrice === undefined) {
                break;
            }

            if (todayPrice < tomorrowPrice) {
                stock = todayPrice;
                profit -= todayPrice;
            }
        } else {
            if (tomorrowPrice === undefined || todayPrice > tomorrowPrice) {
                stock = undefined;
                profit += todayPrice;
            }
        }
    }

    process.stdout.write(String(profit) + '\n');
}

function readNumber() {
    const n = Number(inputLines[currLine]);
    currLine++;
    return n;
}

function readNumberArray() {
    const arr = inputLines[currLine].split(' ').map(Number);
    currLine++;
    return arr;
}
