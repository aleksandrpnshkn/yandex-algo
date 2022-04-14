const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const edgesList = [];

reader.once('line', (params) => {
    reader.on('line', (edge) => {
        edgesList.push(edge.split(' ').map(Number));
    });
});

process.stdin.on('end', solve);

COLOR_WHITE = 1;
COLOR_GRAY = 2;
COLOR_BLACK = 3;

function solve() {
    const colors = [];
    const entry = [];
    const leave = [];
    const adjacencyList = [];

    edgesList.forEach(([fromVertex, toVertex]) => {
        if (adjacencyList[fromVertex] === undefined) {
            adjacencyList[fromVertex] = [];
        }

        adjacencyList[fromVertex].push(toVertex);
    });

    adjacencyList.forEach((toVertices) => {
        toVertices.sort((a, b) => b - a);
    });

    let timer = 0;
    const START_VERTEX = 1;
    const history = [START_VERTEX];

    while (history.length > 0) {
        const curr = history.pop();

        if (colors[curr] === COLOR_BLACK) {
            continue;
        }

        if (colors[curr] === COLOR_GRAY) {
            colors[curr] = COLOR_BLACK;

            leave[curr] = timer;
            timer++;

            continue;
        }

        colors[curr] = COLOR_GRAY;

        entry[curr] = timer;
        timer++;

        const children = adjacencyList[curr] || [];

        history.push(curr);

        children.forEach((childVertex) => {
            if (
                colors[childVertex] === COLOR_GRAY
                || colors[childVertex] === COLOR_BLACK
            ) {
                return;
            }

            history.push(childVertex);
        });
    }

    entry.forEach((entryTime, vertex) => {
        if (entryTime === undefined) {
            return;
        }

        process.stdout.write(`${entryTime} ${leave[vertex]}\n`);
    });
}
