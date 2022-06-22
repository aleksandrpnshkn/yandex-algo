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
    const text = readString();
    const pattern = readString();
    const newText = readString();

    const matches = searchAll(pattern, text);

    const textAfterReplace = [];
    let prevMatch = -pattern.length;

    matches.forEach((matchIndex) => {
        textAfterReplace.push(text.substring(prevMatch + pattern.length, matchIndex) + newText);
        prevMatch = matchIndex;
    });

    textAfterReplace.push(text.substring(prevMatch + pattern.length));

    process.stdout.write(textAfterReplace.join('') + '\n');
}

function searchAll(pattern, text) {
    const results = [];

    const string = pattern + '#' + text;

    const p = new Array(pattern.length);
    p[0] = 0;
    pPrev = 0;

    for (let i = 1; i < string.length; i++) {
        k = pPrev;

        while (k > 0 && string[k] !== string[i]) {
            k = p[k - 1];
        }

        if (string[k] === string[i]) {
            k += 1;
        }

        if (i < pattern.length) {
            p[i] = k;
        }

        if (k === pattern.length) {
            results.push(i - 2 * pattern.length);
        }

        pPrev = k;
    }

    return results;
}

function readString() {
    const str = inputLines[currLine];
    currLine++;
    return str;
}
