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
    const roundsCount = readNumber();
    const rounds = readNumericArray();

    let score = 0;
    const scoreToStartSeriesMap = {
        [score]: -1,
    };

    let maxSeries = 0;

    for (let i = 0; i < roundsCount; i++) {
        if (rounds[i] === 0) {
            score--;
        } else {
            score++;
        }

        if (scoreToStartSeriesMap[score] === undefined) {
            scoreToStartSeriesMap[score] = i;
        } else {
            const series = i - scoreToStartSeriesMap[score];

            if (series > maxSeries) {
                maxSeries = series;
            }
        }
    }

    process.stdout.write(String(maxSeries) + '\n');
}

function readNumericArray() {
    const arr = inputLines[curLine];
    curLine++;

    if (! arr) {
        return [];
    }

    return arr.trim().split(' ').map((num) => Number(num));
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

// const reader = require('readline')
//     .createInterface({
//         input: process.stdin,
//     });

// const inputLines = [];
// let curLine = 0;

// reader.on('line', (line) => {
//     inputLines.push(line);
// });

// process.stdin.on('end', solve);

// class Stack {
//     constructor() {
//         this._items = [];
//     }

//     put(item) {
//         this._items.push(item);
//     }

//     pop() {
//         return this._items.pop();
//     }

//     peek() {
//         if (this.size() === 0) {
//             throw new Error('Stack is empty');
//         }

//         return this._items[this.size() - 1];
//     }

//     size() {
//         return this._items.length;
//     }
// }

// function solve() {
//     const roundsCount = readNumber();

//     const rounds = readNumericArray().map((result, index) => {
//         return {
//             result,
//             index,
//         };
//     });

//     const results = new Stack();
//     const series = [];

//     console.log(rounds.length)

//     rounds.forEach((round) => {
//         // if (round.index === 28) {
//         //     console.log(series)
//         //     console.log(results)
//         // }

//         if (
//             results.size() === 0
//             || results.peek().result === round.result
//         ) {
//             results.put(round);
//             return;
//         }

//         const prev = results.pop();

//         const newSeries = {
//             left: prev.index,
//             right: round.index + 1,
//         };

//         // if (series.length > 0) {

//             // проверить входит ли предыдущий интервал в текущий и заменить если это так
//             while (series.length && series[series.length - 1].right >= prev.index) {
//                 newSeries.left = Math.min(series.pop().left, newSeries.left);
//             }
//         // }

//         newSeries.length = newSeries.right - newSeries.left,
// // console.log(newSeries)
//         series.push(newSeries);
//     });

//     console.log(series)
//     console.log(results)

//     let maxSeries = {
//         length: 0,
//     };

//     series.forEach((interval) => {
//         if (interval.length > maxSeries.length) {
//             maxSeries = interval;
//         }
//     });

//     process.stdout.write(String(maxSeries.length) + '\n');
// }

// function readNumericArray() {
//     const arr = inputLines[curLine];
//     curLine++;

//     if (! arr) {
//         return [];
//     }

//     return arr.trim().split(' ').map((num) => Number(num));
// }

// function readNumber() {
//     const num = Number(inputLines[curLine]);
//     curLine++;
//     return num;
// }
