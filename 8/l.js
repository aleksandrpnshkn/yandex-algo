const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

reader.once('line', solve);

function solve(string) {
    process.stdout.write(prefixFunction(string).join(' ') + '\n');
}

function prefixFunction(string) {
    const p = new Array(string.length);
    p[0] = 0;

    for (let i = 1; i < string.length; i++) {
        k = p[i - 1];

        while (k > 0 && string[k] !== string[i]) {
            k = p[k - 1];
        }

        if (string[k] === string[i]) {
            k += 1;
        }

        p[i] = k;
    }

    return p;
}
