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
    const pairsCount = readNumber();
    const symbols = ['(', ')'];

    const combs = combineSymbols(symbols, pairsCount * 2)
        .filter(isCorrectSequence)
        .map((comb) => comb.join(''));

    combs.sort();

    combs.forEach((comb) => {
        process.stdout.write(comb + '\n');
    });
}

function combineSymbols(symbols, depth = 1) {
    if (depth < 2) {
        return symbols.map((symbol) => [symbol]);
    }

    const combs = [];

    symbols.forEach((symbol) => {
        combineSymbols(symbols, depth - 1).forEach((comb) => {
            comb.push(symbol);
            combs.push(comb);
        });
    });

    return combs;
}

function isCorrectSequence(brackets) {
    let counter = 0;

    for (let i = 0; i < brackets.length; i++) {
        if (brackets[i] === '(') {
            counter++;
            continue;
        }

        counter--;

        if (counter < 0) {
            return false;
        }
    }

    return counter === 0;
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
