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
    const [ySize, xSize] = readNumberArray();

    const routeToFloresMatrix = new Array(ySize + 1);

    for (let i = 0; i <= ySize; i++) {
        routeToFloresMatrix[i] = new Array(xSize + 1);
        routeToFloresMatrix[i].fill(0);
    }

    const mapMatrix = new Array(ySize + 1);
    mapMatrix[0] = new Array(xSize + 1);
    mapMatrix[0].fill(0);

    for (let y = 1; y <= ySize; y++) {
        mapMatrix[ySize - y + 1] = [0].concat(inputLines[y].split('').map(Number));
    }

    for (let y = 1; y <= ySize; y++) {
        for (let x = 1; x <= xSize; x++) {
            routeToFloresMatrix[y][x] = Math.max(routeToFloresMatrix[y - 1][x], routeToFloresMatrix[y][x - 1]) + mapMatrix[y][x];
        }
    }

    process.stdout.write(String(routeToFloresMatrix[ySize][xSize]) + '\n');
}

function readNumberArray() {
    const arr = inputLines[currLine].split(' ').map(Number);
    currLine++;
    return arr;
}
