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
    let [verticesQt, edgesQt] = readNumericArray();
    const adjacencyMatrix = new Array(verticesQt);

    for (let i = 0; i < adjacencyMatrix.length; i++) {
        adjacencyMatrix[i] = new Array(verticesQt);
        adjacencyMatrix[i].fill(0);
    }

    while (edgesQt) {
        const [fromVertex, toVertex] = readNumericArray();
        adjacencyMatrix[fromVertex - 1][toVertex - 1] = 1;

        edgesQt--;
    }

    adjacencyMatrix.forEach((row) => {
        process.stdout.write(row.join(' ') + '\n');
    });
}

function readNumericArray() {
    const num = inputLines[curLine].split(' ').map(Number);
    curLine++;
    return num;
}
