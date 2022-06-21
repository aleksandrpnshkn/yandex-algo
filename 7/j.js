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
    const seq = readNumberArray();

    const dp = new Array(seq.length + 1);

    dp[0] = new Array(seq.length + 1);
    dp[0].fill(0);

    for (let i = 1; i <= seq.length; i++) {
        dp[i] = new Array(seq.length + 1);
        dp[i].fill(0);

        let maxVal = 0;

        for (let j = 1; j <= seq.length; j++) {
            dp[i][j] = dp[i - 1][j];

            if (seq[i - 1] === seq[j - 1] && dp[i - 1][j] < maxVal + 1) {
                dp[i][j] = maxVal + 1;
            }

            if (seq[j - 1] < seq[i - 1] && dp[i - 1][j] > maxVal) {
                maxVal = dp[i - 1][j];
            }
        }
    }

    console.log(dp)

    // process.stdout.write(String(LCS.length) + '\n');
}

function skipLine() {
    currLine++;
}

function readNumberArray() {
    const arr = inputLines[currLine].split(' ').map(Number);
    currLine++;
    return arr;
}
