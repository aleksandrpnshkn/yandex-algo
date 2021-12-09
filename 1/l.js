const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', (line) => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    const letterCountMap = {};

    const str1 = readString() + readString();

    for (let i = 0; i < str1.length; i++) {
        const letter = str1[i];
        
        if (letterCountMap[letter]) {
            letterCountMap[letter]++;
        } else {
            letterCountMap[letter] = 1;
        }
    }

    const diff = Object.entries(letterCountMap)
        .filter((letterCount) => {
            return letterCount[1] % 2 === 1;
        })  
        .map((letterCount) => letterCount[0]);

    process.stdout.write(diff.join(''));
}

function readString() {
    const str = _inputLines[_curLine];

    _curLine++;

    return str;
}








    // const str1 = readString();
    // const str2 = readString();

    // for (let i = 0; i < str1.length; i++) {
    //     const letter = str1[i];
        
    //     if (letterCountMap[letter] === 'undefined') {
    //         letterCountMap[letter] = 1;
    //     } else {
    //         letterCountMap[letter]++;
    //     }
    // }

    // for (let i = 0; i < str2.length; i++) {
    //     const letter = str2[i];
        
    //     if (letterCountMap[letter] === 'undefined') {
    //         letterCountMap[letter] = -1;
    //     } else {
    //         letterCountMap[letter]--;
    //     }
    // }

    // const longest = str1.length > str2.length ? str1 : str2;
    // const shortest = str1.length < str2.length ? str1 : str2;

    // const diff = longest.split('').filter((letter) => {
    //     return ! shortest.includes(letter);
    // });