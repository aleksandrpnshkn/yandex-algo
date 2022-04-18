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

const COLOR_WHITE = -2;
const COLOR_GRAY = -1;

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

    const history = [];
    const coloredVertices = [];

    let currColor = COLOR_GRAY;

    for (let i = 1; i <= verticesQt; i++) {
        if (colors[i] > COLOR_GRAY) {
            continue;
        }

        history.push(i);
        currColor++;

        while (history.length > 0) {
            const curr = history.pop();

            if (colors[curr] > COLOR_GRAY) {
                continue;
            }

            if (colors[curr] === COLOR_GRAY) {
                colors[curr] = currColor;

                if (coloredVertices[currColor] === undefined) {
                    coloredVertices[currColor] = [];
                }

                coloredVertices[currColor].push(curr);

                continue;
            }

            colors[curr] = COLOR_GRAY;
            history.push(curr);

            const toVertices = adjacencyList[curr] || [];

            toVertices.forEach((toVertex) => {
                if (colors[toVertex] !== COLOR_WHITE) {
                    return;
                }

                history.push(toVertex);
            });
        }
    }

    process.stdout.write(coloredVertices.length + '\n');

    coloredVertices.forEach((vertices) => {
        vertices.sort((a, b) => a - b);

        process.stdout.write(vertices.join(' ') + '\n');
    });
}

function readNumericArray() {
    const num = inputLines[curLine].split(' ').map(Number);
    curLine++;
    return num;
}
