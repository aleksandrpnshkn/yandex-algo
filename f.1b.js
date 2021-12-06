// ID успешной посылки 60102720

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
    const players = 2;
    const maxDigit = 10;
    const k = Number(inputLines[0]);
    const keyCountMap = {};
    
    const maxClicks = players * k;

    const keyboard = inputLines.slice(1)
        .join('')
        .split('');

    keyboard.forEach((key) => {
        if (keyCountMap[key] === undefined) {
            keyCountMap[key] = 0;
        } 

        keyCountMap[key]++;
    });

    let points = 0;

    for (let t = 0; t <= maxDigit; t++) {
        const keyCount = keyCountMap[String(t)];

        if (keyCount && keyCount <= maxClicks) {
            points++;
        }
    }

    process.stdout.write(String(points));
}
