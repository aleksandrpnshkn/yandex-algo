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
    const seq1 = readNumberArray();
    skipLine();
    const seq2 = readNumberArray();

    const dp = new Array(seq1.length + 1);

    for (let i = 0; i <= seq1.length; i++) {
        dp[i] = new Array(seq2.length + 1);
        dp[i].fill(0);
    }

    // найти НОП
    for (let i1 = 1; i1 <= seq1.length; i1++) {
        const item1 = seq1[i1 - 1];

        for (let i2 = 1; i2 <= seq2.length; i2++) {
            const item2 = seq2[i2 - 1];

            if (item1 === item2) {
                dp[i1][i2] = dp[i1 - 1][i2 - 1] + 1;
            } else {
                dp[i1][i2] = Math.max(dp[i1 - 1][i2], dp[i1][i2 - 1]);
            }
        }
    }

    // построить обратный путь
    let i1 = seq1.length;
    let i2 = seq2.length;

    let LCS = {
        subSeq1: [],
        subSeq2: [],
        length: dp[i1][i2],
    };

    let itemsRemains = LCS.length;

    while (i1 > 0 && i2 > 0) {
        const item1 = seq1[i1 - 1];
        const item2 = seq2[i2 - 1];


        if (item1 === item2) {
            LCS.subSeq1[itemsRemains - 1] = i1;
            LCS.subSeq2[itemsRemains - 1] = i2;
            itemsRemains--;

            i1--;
            i2--;
        } else {
            if (dp[i1 - 1][i2] >= dp[i1][i2 - 1]) {
                i1--;
            } else {
                i2--;
            }
        }
    }

    process.stdout.write(String(LCS.length) + '\n');
    process.stdout.write(String(LCS.subSeq1.join(' ')) + '\n');
    process.stdout.write(String(LCS.subSeq2.join(' ')) + '\n');
}

function skipLine() {
    currLine++;
}

function readNumberArray() {
    const arr = inputLines[currLine].split(' ');
    currLine++;
    return arr;
}
