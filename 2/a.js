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
    const rowsCount = readNum();
    const columnsCount = readNum();
    const wrongMatrix = inputLines
        .slice(2)
        .map((row) => row.split(' '));

    let matrix = new Array(columnsCount);

    wrongMatrix.forEach((row) => {
        row.forEach((number, i) => {
            if (matrix[i] === undefined) {
                matrix[i] = [];
            }

            matrix[i].push(number);
        });
    });

    matrix.forEach((row) => {
        process.stdout.write(row.join(' '));
        process.stdout.write('\n');
    });
}

function readNum() {
    const num = Number(inputLines[currLine]);

    currLine++;

    return num;
}
