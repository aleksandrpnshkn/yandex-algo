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
    const a = readNumber();
    const m = readNumber();
    const str = readString();
    const posCount = readNumber();
    const positions = inputLines.slice(4, 4 + posCount);

    const prefixes = new Array(str.length);

    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = (a * hash + str.charCodeAt(i)) % m;
        prefixes[i] = hash;
    }

    const aPreCalculated = new Array(str.length);
    let currA = 1;

    for (let i = 1; i < str.length; i++) {
        currA = (currA * a) % m
        aPreCalculated[i] = currA;
    }

    positions.forEach((pos) => {
        const [leftPos, rightPos] = pos.split(' ').map((strPos) => Number(strPos) - 1);

        let hash = prefixes[rightPos];

        if (leftPos) {
            hash -= (prefixes[leftPos - 1] * aPreCalculated[rightPos - leftPos + 1] % m) % m;
        }

        hash = (m + hash) % m;

        process.stdout.write(hash + '\n');
    });
}

function readString() {
    const str = inputLines[curLine];
    curLine++;
    return str;
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
