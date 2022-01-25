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
    const str = readString();

    let maxDist = 0;
    let lastDuplicatePos = -1;
    const lastCharPos = new Array('z'.charCodeAt(0));

    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);

        if (lastCharPos[code] === undefined || lastCharPos[code] < lastDuplicatePos) {
            lastCharPos[code] = i;
            continue;
        }

        maxDist = Math.max(i - lastDuplicatePos - 1, maxDist);
        lastDuplicatePos = lastCharPos[code];
        lastCharPos[code] = i;
    }

    maxDist = Math.max(str.length - lastDuplicatePos - 1, maxDist);

    process.stdout.write(String(maxDist));
}

function readString() {
    const str = inputLines[curLine];
    curLine++;
    return str;
}
