const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin,
});

let sentence = null;

_reader.on('line', (line) => {
    sentence = line;
});

process.stdin.on('end', solve);

function solve() {
    let i = 0;
    let j = sentence.length - 1;

    while (i < j) {
        while (! /\w/.test(sentence[i])) {
            i++;
        }

        while (! /\w/.test(sentence[j])) {
            j--;
        }
        
        if (sentence[i].toLowerCase() !== sentence[j].toLowerCase()) {
            process.stdout.write('False');
            return;
        }

        i++;
        j--;
    }

    process.stdout.write('True');
    return;
}

// function solve() {
//     sentence = sentence.toLowerCase().replace(/\W/g, '');

//     let i,
//         j;

//     i = Math.floor(sentence.length / 2);
//     j = sentence.length % 2 === 0 ? i + 1 : i;

//     while (i > 0) {
//         if (sentence[i] !== sentence[j]) {
//             process.stdout.write('False');
//             return;
//         }
        
//         i--;
//         j++;
//     }

//     process.stdout.write('True');
//     return;
// }
