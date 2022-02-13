const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

reader.once('line', (wordsCount) => {
    reader.once('line', (wordsStr) => {
        solve(wordsStr.split(' '));
    });
});

function solve(words) {
    const groups = {};

    words
        .map((word) => {
            word = word.split('');
            word.sort();
            return word.join('');
        })
        .forEach((word, index) => {
            if (groups[word] === undefined) {
                groups[word] = [];
            }

            groups[word].push(index);
        });

    for (let word in groups) {
        process.stdout.write(groups[word].join(' ') + '\n')
    }
}
