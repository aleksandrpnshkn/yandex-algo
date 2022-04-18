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

        adjacencyList[fromVertex].push(toVertex);

        edgesQt--;
    }

    const history = [];
    const result = [];

    for (let i = verticesQt; i >= 1; i--) {

        if (colors[i] === COLOR_BLACK) {
            continue;
        }

        history.push(i);

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
            history.push(curr);

            const children = adjacencyList[curr] || [];

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
    }

    for (let l = 0, r = result.length - 1; l < r; l++, r--) {
        [result[l], result[r]] = [result[r], result[l]];
    }

    process.stdout.write(result.join(' ') + '\n');
}

function readNumericArray() {
    const num = inputLines[curLine].split(' ').map(Number);
    curLine++;
    return num;
}
