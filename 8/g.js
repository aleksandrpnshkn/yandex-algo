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
    skipLine();
    const measures = readNumberArray();
    skipLine();
    const template = normalizeTemplate(readNumberArray());

    const results = [];

    const lastPossibleMatch = measures.length - template.length;

    for (let i = 0; i <= lastPossibleMatch; i++) {
        let start = measures[i];
        let isFound = true;

        for (let k = 1; k < template.length; k++) {
            const curr = measures[i + k];

            if (curr - start !== template[k]) {
                isFound = false;
                break;
            }
        }

        if (isFound) {
            results.push(i + 1);
        }
    }

    process.stdout.write(results.join(' ') + '\n');
}

// шаблон должен стартовать с 0 для удобства относительных проверок
function normalizeTemplate(template) {
    if (template[0] === 0) {
        return template;
    }

    const offset = template[0];

    return template.map((temp) => temp - offset);
}

function skipLine() {
    currLine++;
}

function readNumberArray() {
    const arr = inputLines[currLine].split(' ').map(Number);
    currLine++;
    return arr;
}
