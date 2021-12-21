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
    const arr = readArray();

    arr.sort((a, b) => {
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if (a[i] === undefined) {
                if (b[i] === a[0]) {
                    continue;
                }

                return b[i] - a[0];
            }

            if (b[i] === undefined) {
                if (b[0] === a[i]) {
                    continue;
                }

                return b[0] - a[i];
            }

            if (a[i] < b[i]) {
                return 1;
            }

            if (a[i] > b[i]) {
                return -1;
            }
        }

        if (a.length !== b.length) {
            for (let i = 1; i < Math.min(a.length, b.length); i++) {
                if (a[i-1] === a[i]) {
                    continue;
                }

                if (a.length < b.length) {
                    return a[i-1] - a[i];
                }

                if (a.length > b.length) {
                    return a[i] - a[i-1];
                }
            }
        }

        return 0;
    });

    process.stdout.write(arr.join('') + '\n');
}

function readArray() {
    const arr = inputLines[curLine].trim().split(' ');
    curLine++;
    return arr;
}
