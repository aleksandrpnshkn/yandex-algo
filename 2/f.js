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

class StackMax {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.items.length === 0) {
            throw new Error();
        }

        this.items.pop();
    }

    getMax() {
        if (this.items.length === 0) {
            throw new Error();
        }

        return this.items.reduce((max, curr) => {
            return curr > max ? curr : max;
        });
    }
}

class StackMaxStdout {
    constructor() {
        this.stackMax = new StackMax();
    }

    push(item) {
        this.stackMax.push(item);
    }

    pop() {
        try {
            this.stackMax.pop();
        } catch {
            process.stdout.write('error\n');
        }
    }

    get_max() {
        try {
            const max = this.stackMax.getMax();
            process.stdout.write(String(max) + '\n');
        } catch {
            process.stdout.write('None\n');
        }
    }
}

function solve() {
    const commandsCount = readNumber();
    const stackMax = new StackMaxStdout();

    for (let i = 0; i < commandsCount; i++) {
        const [command, arg] = readArray();

        stackMax[command](Number(arg));
    }
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readArray() {
    const arr = inputLines[curLine]
        .trim()
        .split(' ');

    curLine++;

    return arr;
}
