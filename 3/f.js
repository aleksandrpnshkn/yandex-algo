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
    const lengths = readNumericArray();

    lengths.sort((a, b) => b - a);

    for (let cIndex = 0; cIndex < lengths.length; cIndex++) {
        const c = lengths[cIndex];

        for (let bIndex = cIndex + 1; bIndex < lengths.length; bIndex++) {
            const b = lengths[bIndex];

            for (let aIndex = bIndex + 1; aIndex < lengths.length; aIndex++) {
                const a = lengths[aIndex];

                if (c < a + b) {
                    process.stdout.write(String(a + b + c) + '\n');
                    return;
                }
            }
        }
    }
}

function readNumericArray() {
    const arr = inputLines[curLine].trim().split(' ').map((num) => Number(num));
    curLine++;
    return arr;
}
