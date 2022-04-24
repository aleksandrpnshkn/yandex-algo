const reader = require('readline').createInterface({input: process.stdin});

let verticesQt;
let edgesQt;
let startVertex;

const adjacencyList = [];

reader.once('line', (line) => {
    [verticesQt, edgesQt] = line.split(' ').map(Number);

    let currEdge = 0;

    reader.on('line', (edge) => {
        currEdge++;

        if (currEdge > edgesQt) {
            startVertex = edge;
            return;
        }

        const [fromVertex, toVertex] = edge.split(' ').map(Number);

        if (adjacencyList[fromVertex] === undefined) {
            adjacencyList[fromVertex] = [];
        }

        if (adjacencyList[toVertex] === undefined) {
            adjacencyList[toVertex] = [];
        }

        adjacencyList[fromVertex].push(toVertex);
        adjacencyList[toVertex].push(fromVertex);
    });
});

const COLOR_WHITE = undefined;
const COLOR_GRAY = 0;
const COLOR_BLACK = 1;

process.stdin.on('end', () => {
    const planned = [startVertex];
    const colors = [];
    const distances = [];
    distances[startVertex] = 0;
    let lastDistance = 0;

    let curr = -1;

    while (curr < planned.length - 1) {
        curr++;
        const vertex = planned[curr];

        if (colors[vertex] === COLOR_BLACK) {
            continue;
        }

        colors[vertex] = COLOR_BLACK;

        const toVertices = adjacencyList[vertex] || [];

        toVertices.forEach((toVertex) => {
            if (colors[toVertex] !== COLOR_WHITE) {
                return;
            }

            lastDistance = distances[vertex] + 1;
            distances[toVertex] = lastDistance;
            planned.push(toVertex);

            colors[toVertex] = COLOR_GRAY;
        });
    }

    process.stdout.write(String(lastDistance) + '\n');
})
