// ID успешной посылки 60829433

/*
 * -- ПРИНЦИП РАБОТЫ --
 *
 * На основе стека, как и сказано в задаче.
 * Добавлен класс Calculator, инкапсулирующий логику работы со стеком и вычислением
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 *
 * Операция выполняется как только встретился оператор.
 * Операторы передаются последовательно, значит правильная последовательность операций гарантирована.
 *
 * Результат операции возвращается в стек.
 * Это означает что следующая операция получит второй операнд.
 * Это также гарантирует что результат выражения будет в стеке.
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 *
 * O(n), т.к. все операции выполняются за один цикл по инпуту
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 *
 * O(n), т.к. в худшем случае, в памяти будет 2/3 переданных элементов (операнды без операторов)
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
        this._items.push(item);
    }

    pop() {
        if (this._items.length < 1) {
            throw new Error('Стек пуст');
        }

        return this._items.pop();
    }

    size() {
        return this._items.length;
    }
}

class Calculator {
    constructor() {
        this._operands = new Stack();
    }

    addOperand(operand) {
        this._operands.push(operand);
    }

    executeOperation(operation) {
        const op2 = this._operands.pop();
        const op1 = this._operands.pop();
        let result;

        switch (operation) {
            case '-':
                result = op1 - op2;
                break;
            case '+':
                result = op1 + op2;
                break;
            case '*':
                result = op1 * op2;
                break;
            case '/':
                result = Math.floor(op1 / op2);
                break;
            default:
                throw new Error('Неизвестная операция');
        }

        this._operands.push(result);
    }

    getResult() {
        return this._operands.pop();
    }
}

process.stdin.on('end', solve);

function solve() {
    const expression = readArray();
    const calculator = new Calculator();

    expression.forEach((element) => {
        if (isOperand(element)) {
            calculator.addOperand(Number(element));
        } else {
            calculator.executeOperation(element);
        }
    });

    process.stdout.write(String(calculator.getResult()) + '\n');
}

function isOperand(n) {
    return ! isNaN(n);
}

function readArray() {
    const arr = inputLines[curLine].trim().split(' ');
    curLine++;
    return arr;
}
