const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const inputLines = [];

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    const origin = inputLines[0].split('');

    const inserts = new Array(origin.length + 1);

    let outputLength = origin.length;

    for (let i = 2; i < inputLines.length; i++) {
        const [stringToInsert, posToInsert] = inputLines[i].split(' ');

        inserts[Number(posToInsert)] = stringToInsert;
        outputLength += stringToInsert.length;
    }

    const output = new Array(outputLength);
    let lastPos = 0;

    for (let posToInsert = 0; posToInsert < inserts.length; posToInsert++) {
        if (inserts[posToInsert]) {
            for (let i = 0; i < inserts[posToInsert].length; i++) {
                output[lastPos] = inserts[posToInsert][i];
                lastPos++;
            }
        }

        // в последнем будет undefined
        output[lastPos] = origin[posToInsert];
        lastPos++;
    }

    process.stdout.write(output.join('') + '\n');
}
