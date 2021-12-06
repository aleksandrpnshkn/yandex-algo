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
    const k = Number(inputLines[0]);
    
    const maxClicks = players * k;

    const keyboard = inputLines.slice(1)
        .join('')
        .split('');

    let points = 0;

    for (let t = 0; t < 10; t++) {
        let clicks = 0;
        
        keyboard.forEach((key) => {
            if (Number(key) === t) {
                clicks++;
            }
        });

        if (clicks && clicks <= maxClicks) {
            points++;
        }
    }

    process.stdout.write(String(points));
}
