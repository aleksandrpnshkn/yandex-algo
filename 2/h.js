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

function solve() {
    const brackets = readString();

    const openingBrackets = '{[(';
    const closingBrackets = '}])';

    const bracketsStack = new Stack();

    for (let i = 0; i < brackets.length; i++) {
        const bracket = brackets[i];
        const closingBracketIndex = closingBrackets.indexOf(bracket);
        const isOpening = closingBracketIndex === -1;

        if (isOpening) {
            bracketsStack.push(bracket);
            continue;
        }

        const openBracket = bracketsStack.pop();
        const openingBracketIndex = openingBrackets.indexOf(openBracket);

        if (openingBracketIndex !== closingBracketIndex) {
            process.stdout.write('False');
            return;
        }
    }

    if (bracketsStack.size() > 0) {
        process.stdout.write('False');
    } else {
        process.stdout.write('True');
    }
}

function readString() {
    const num = inputLines[curLine];
    curLine++;
    return num;
}
