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
    const a = readString().split('');
    const b = readString().split('');

    if (Math.abs(a.lingth - b.length) > 2) {
        process.stdout.write('FAIL\n');
    }

    const maxLength = Math.max(a.length, b.length);
    let isChanged = false;

    for (let i = 0; i < maxLength; i++) {
        if (a[i] === b[i]) {
            continue;
        }

        if (isChanged) {
            process.stdout.write('FAIL\n');
            return;
        }

        if (a.length === b.length) {
            isChanged = true;
            continue;
        }

        const longest = getLongest(a, b);
        const shortest = getShortest(a, b);

        if (longest[i + 1] === shortest[i]) {
            longest.splice(i, 1);
            isChanged = true;
            continue;
        }

        process.stdout.write('FAIL\n');
        return;
    }

    process.stdout.write('OK\n');
}

function getLongest(countable1, countable2) {
    return countable1.length > countable2.length ? countable1 : countable2;
}

function getShortest(countable1, countable2) {
    return countable1.length < countable2.length ? countable1 : countable2;
}

function readString() {
    const str = inputLines[currLine];
    currLine++;
    return str;
}
