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
    let capacity = readNumber();
    const pilesCount = readNumber();
    const piles = readPiles(pilesCount);

    piles.sort((pile1, pile2) => pile1.price - pile2.price);

    let profit = 0;

    while (capacity > 0 && piles.length > 0) {
        const bestPile = piles.pop();

        const weightToTake = Math.min(capacity, bestPile.weight);

        capacity -= weightToTake;
        profit += weightToTake * bestPile.price;
    }

    process.stdout.write(String(profit) + '\n');
}

function readNumber() {
    const n = Number(inputLines[currLine]);
    currLine++;
    return n;
}

function readPiles(pilesCount) {
    return inputLines.slice(2, pilesCount + 2)
        .map((pile) => {
            const [price, weight] = pile.split(' ').map(Number);

            return {
                price,
                weight,
            }
        });
}
