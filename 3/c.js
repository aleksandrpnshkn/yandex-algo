const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const inputLines = [];

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    const s = inputLines[0];
    const t = inputLines[1];

    let lastPos = -1;

    for (let i = 0; i < s.length; i++) {
        const pos = t.indexOf(s[i], lastPos + 1);

        if (pos === -1) {
            process.stdout.write('False\n');
            return;
        }

        lastPos = pos;
    }

    process.stdout.write('True\n');
}
