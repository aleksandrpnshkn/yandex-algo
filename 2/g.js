const { runInThisContext } = require('vm');

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

class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        return this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    size() {
        return this.items.length;
    }

    top() {
        if (this.size() === 0) {
            return;
        }

        return this.items[this.size() - 1];
    }
}

class StackMaxEffective extends Stack {
    constructor() {
        super();
        this.maxIndexes = new Stack();
    }

    push(number) {
        if (this.maxIndexes.size() === 0 || number > this.getMax()) {
            this.maxIndexes.push(this.size());
        }

        return super.push(number);
    }

    pop() {
        const maxIndex = this.maxIndexes.top();

        if (maxIndex === this.size() - 1) {
            this.maxIndexes.pop();
        }

        return super.pop();
    }

    getMax() {
        return this.items[this.maxIndexes.top()];
    }
}

class StackMaxStdout {
    constructor() {
        this.stackMax = new StackMaxEffective();
    }

    push(item) {
        this.stackMax.push(item);
    }

    pop() {
        if (this.stackMax.pop() === undefined) {
            process.stdout.write('error\n');
        }
    }

    get_max() {
        const max = this.stackMax.getMax();

        if (max === undefined) {
            process.stdout.write('None\n');
            return;
        }

        process.stdout.write(String(max) + '\n');
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
