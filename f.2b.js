// ID успешной посылки 60825242

/*
 * -- ПРИНЦИП РАБОТЫ --
 *
 *
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 *
 *
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 *
 *
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 *
 *
 */

const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const inputLines = [];
let curLine = 0;

reader.on('line', (line) => {
    inputLines.push(line);
});
class Stack {
    constructor() {
        this._items = [];
    }

    push(item) {
        return this._items.push(item);
    }

    pop() {
        if (this._items.length < 1) {
            throw new Error('Стек пуст');
        }

        return this._items.pop();
    }
}

process.stdin.on('end', solve);

const operations = {
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.floor(a / b),
};

function solve() {
    const expression = readArray();
    const expressionStack = new Stack();

    expression.forEach((element) => {
        if (isOperand(element)) {
            expressionStack.push(Number(element));
            return;
        }

        if (! element in operations) {
            throw new Error('Неизвестная операция');
        }

        let op1 = expressionStack.pop();
        let op2 = expressionStack.pop();
        let result = operations[element](op1, op2);

        expressionStack.push(result);
    });

    process.stdout.write(String(expressionStack.pop()));
}

function isOperand(n) {
    return ! isNaN(n);
}

function readArray() {
    const arr = inputLines[curLine].trim().split(' ');
    curLine++;
    return arr;
}
