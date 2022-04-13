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
    // Начало с 1
    const adjacencyList = new Array(verticesQt + 1);

    while (edgesQt) {
        const [fromVertex, toVertex] = readNumericArray();

        if (adjacencyList[fromVertex] === undefined) {
            adjacencyList[fromVertex] = [];
        }

        adjacencyList[fromVertex].push(toVertex);

        edgesQt--;
    }

    for (let i = 1; i < adjacencyList.length; i++) {
        const toVertices = adjacencyList[i];

        if (! toVertices) {
            process.stdout.write('0\n');
            continue;
        }

        process.stdout.write(toVertices.length + ' ' + toVertices.join(' ') + '\n');
    }
}

function readNumericArray() {
    const num = inputLines[curLine].split(' ').map(Number);
    curLine++;
    return num;
}
