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
    const [goldBarsCount, maxWeight] = readNumberArray();
    const goldBars = readNumberArray();

    let prevWeights;
    // добавить каемочку
    let currWeights = new Array(maxWeight + 1);
    currWeights.fill(0);

    for (let goldBarDpIndex = 1; goldBarDpIndex <= goldBarsCount; goldBarDpIndex++) {
        prevWeights = currWeights;
        currWeights = new Array(maxWeight + 1);

        // добавить каемочку
        currWeights[0] = 0;

        const goldBarWeight = goldBars[goldBarDpIndex - 1];

        for (let backpackWeight = 1; backpackWeight <= maxWeight; backpackWeight++) {
            const weightRemains = backpackWeight - goldBarWeight;

            const prevBarMaxWeight = prevWeights[backpackWeight];
            let currCombinedWeight = 0;

            if (goldBarWeight <= backpackWeight) {
                currCombinedWeight = goldBarWeight + prevWeights[weightRemains];
            }

            currWeights[backpackWeight] = Math.max(prevBarMaxWeight, currCombinedWeight);
        }
    }

    process.stdout.write(String(currWeights[maxWeight]) + '\n');
}

function readNumberArray() {
    const arr = inputLines[currLine].split(' ').map(Number);
    currLine++;
    return arr;
}
