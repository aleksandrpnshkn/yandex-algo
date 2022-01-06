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
    readNumber();
    const areas = readNumericArray();
    const k = readNumber();

    let diffs = [];

    areas.sort((a, b) => a - b);

    for (let i = 0; i < areas.length; i++) {
        const currDiffs = [];

        for (let j = i + 1; j < areas.length; j++) {
            const diff = Math.abs(areas[i] - areas[j]);

            if (currDiffs.length < k) {
                currDiffs.push(diff);
            }
        }

        diffs = mergeSorted(diffs, currDiffs, k);
    }

    process.stdout.write(String(diffs[k - 1]) + '\n');
}

function mergeSorted(arr1, arr2, maxSize) {
    const merged = [];

    let i = 0;
    let k = 0;

    while (i < arr1.length && k < arr2.length && merged.length < maxSize) {
        if (arr1[i] <= arr2[k]) {
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[k]);
            k++;
        }
    }

    while (i < arr1.length && merged.length < maxSize) {
        merged.push(arr1[i]);
        i++;
    }

    while (k < arr2.length && merged.length < maxSize) {
        merged.push(arr2[k]);
        k++;
    }

    return merged;
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readNumericArray() {
    const arr = inputLines[curLine].trim().split(' ').map((num) => Number(num));
    curLine++;
    return arr;
}
