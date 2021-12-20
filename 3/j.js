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
    const arr = readNumericArray();

    for (let k = 0; true; k++) {
        let hasChanges = false;

        for (let i = 1; i < arr.length; i++) {
            if (arr[i-1] > arr[i]) {
                [arr[i-1], arr[i]] = [arr[i], arr[i-1]];
                hasChanges = true;
            }
        }

        if (hasChanges) {
            process.stdout.write(arr.join(' ') + '\n');
        }

        if (! hasChanges) {
            if (k === 0) {
                process.stdout.write(arr.join(' ') + '\n');
            }

            break;
        }
    }
}

function readNumericArray() {
    const arr = inputLines[curLine].trim().split(' ').map((num) => Number(num));
    curLine++;
    return arr;
}
