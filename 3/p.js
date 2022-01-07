const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

let inputLines = [];
let curLine = 0;

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    readNumber();
    const arr = readNumericArray();

    const blocks = [];

    let blockStart = 0;

    while (blockStart < arr.length) {
        let blockEnd = blockStart + 1;
        let blockMax = arr[blockStart];
        let prevMax = blockMax;

        for (let j = blockStart + 1; j < arr.length; j++) {
            if (arr[j] > prevMax) {
                prevMax = arr[j];
            }

            if (arr[j] < blockMax) {
                blockEnd = j + 1;
                blockMax = prevMax;
            }
        }

        blocks.push([blockStart, blockEnd]);
        blockStart = blockEnd;
    }

    process.stdout.write(String(blocks.length + '\n'));
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readNumericArray() {
    if (! inputLines[curLine].trim()) {
        curLine++;
        return [];
    }

    const arr = inputLines[curLine].trim().split(' ').map((num) => Number(num));
    return arr;
}
