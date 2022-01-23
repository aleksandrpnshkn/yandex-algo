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
    const str1 = readString();
    const str2 = readString();

    if (str1.length !== str2.length) {
        process.stdout.write('NO\n');
        return;
    }

    const symbolsMap = {};
    const usedSymbols = new Set();

    for (let i = 0; i < str1.length; i++) {
        let symbol = str1[i];

        if (symbolsMap[symbol] === undefined) {
            if (usedSymbols.has(str2[i])) {
                process.stdout.write('NO\n');
                return;
            }

            symbolsMap[symbol] = str2[i];
            usedSymbols.add(str2[i]);
        } else if (symbolsMap[symbol] !== str2[i]) {
            process.stdout.write('NO\n');
            return;
        }
    }

    process.stdout.write('YES\n');
}

function readString() {
    const str = inputLines[curLine];
    curLine++;
    return str;
}
