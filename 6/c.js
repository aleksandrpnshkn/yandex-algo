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

COLOR_WHITE = 1;
COLOR_GRAY = 2;
COLOR_BLACK = 3;

function solve() {
    let [verticesQt, edgesQt] = readNumericArray();
    const colors = new Array(verticesQt + 1);
    colors.fill(COLOR_WHITE);
    colors[0] = undefined;
    const adjacencyList = new Array(verticesQt + 1);

    while (edgesQt) {
        const [fromVertex, toVertex] = readNumericArray();

        if (adjacencyList[fromVertex] === undefined) {
            adjacencyList[fromVertex] = [];
        }

        if (adjacencyList[toVertex] === undefined) {
            adjacencyList[toVertex] = [];
        }

        adjacencyList[fromVertex].push(toVertex);
        adjacencyList[toVertex].push(fromVertex);

        edgesQt--;
    }

    adjacencyList.forEach((toVertices) => {
        toVertices.sort((a, b) => b - a);
    });

    const startVertex = readNum();
    const history = [startVertex];
    const result = [];

    while (history.length > 0) {
        const curr = history.pop();

        if (colors[curr] === COLOR_BLACK) {
            continue;
        }

        if (colors[curr] === COLOR_GRAY) {
            colors[curr] = COLOR_BLACK;
            result.push(curr);
            continue;
        }

        colors[curr] = COLOR_GRAY;

        const children = adjacencyList[curr] || [];

        children.forEach((childVertex) => {
            if (colors[childVertex] !== COLOR_WHITE) {
                return;
            }

            history.push(childVertex);
        });

        history.push(curr);
    }

    process.stdout.write(result.join(' ') + '\n');
}

function readNumericArray() {
    const num = inputLines[curLine].split(' ').map(Number);
    curLine++;
    return num;
}

function readNum() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
