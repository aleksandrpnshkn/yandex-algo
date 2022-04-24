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

process.stdin.on('end', () => {
    const planned = [startVertex];
    const colors = [];
    const output = [];
    adjacencyList.forEach((toVertices) => toVertices.sort((a, b) => a - b));

    let curr = -1;

    while (curr < planned.length - 1) {
        curr++;
        const vertex = planned[curr];

        if (colors[vertex] !== COLOR_WHITE) {
            continue;
        }

        colors[vertex] = COLOR_GRAY;

        const toVertices = adjacencyList[vertex] || [];

        toVertices.forEach((toVertex) => {
            planned.push(toVertex);
        });

        output.push(vertex);
    }

    process.stdout.write(output.join(' ') + '\n');
})
