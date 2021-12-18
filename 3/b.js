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

const keyboard = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
};

function solve() {
    const keys = readString();
    printCombs(keys);
}

function printCombs(keys, currentIndex = 0, acc = '') {
    if (currentIndex >= keys.length) {
        process.stdout.write(acc + ' ');
        return;
    }

    const currentKey = keys[currentIndex];

    keyboard[currentKey].forEach((letter) => {
        printCombs(keys, currentIndex + 1, acc + letter);
    });
}

function readString() {
    const num = inputLines[curLine];
    curLine++;
    return num;
}
