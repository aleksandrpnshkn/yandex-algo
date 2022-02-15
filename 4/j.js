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

function solve() {
    const length = readNumber();
    const sum = readNumber();
    const numbers = readNumericArray();

    numbers.sort((a, b) => a - b);

    const halfSums = new Set();

    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            halfSums.add(numbers[i] + numbers[j]);
        }
    }

    let results = [];

    halfSums.forEach((halfSum1) => {
        if (halfSums.has(sum - halfSum1)) {
            const halfSum2 = sum - halfSum1;
            gen1 = twoSumGen(halfSum1, numbers);

            for (let indexes1 of gen1) {
                gen2 = twoSumGen(halfSum2, numbers);

                for (let indexes2 of gen2) {
                    const sum4Indexes = new Set(indexes1.concat(indexes2));

                    if (sum4Indexes.size === 4) {
                        const result = Array.from(sum4Indexes).map((index) => numbers[index]);
                        result.sort((a, b) => a - b);
                        results.push(result);
                    }
                }
            }
        }
    });

    results.sort((a, b) => {
        return a[0] - b[0]
            || a[1] - b[1]
            || a[2] - b[2]
            || a[3] - b[3];
    });

    results = new Set(results.map((result) => result.join(' ')));

    process.stdout.write(String(results.size) + '\n');
    results.forEach((result) => process.stdout.write(result + '\n'));
}

function* twoSumGen(sum, arr) {
    let l = 0;
    let r = arr.length - 1;

    while (l < r) {
        if (arr[l] + arr[r] === sum) {
            yield [l, r];
            l++;
            r--;
        } else if (arr[l] + arr[r] > sum) {
            r--;
        } else {
            l++;
        }
    }
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readNumericArray() {
    const arr = inputLines[curLine].split(' ').map((n) => Number(n));
    curLine++;
    return arr;
}
