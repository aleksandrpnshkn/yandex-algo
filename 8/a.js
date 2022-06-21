const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

reader.once('line', (line) => {
    line = line.split(' ');

    for (let i = line.length - 1; i >= 0; i--) {
        process.stdout.write(line[i] + ' ');
    }

    process.stdout.write('\n');
});
