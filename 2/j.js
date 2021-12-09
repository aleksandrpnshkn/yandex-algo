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

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class QueueList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    push(item) {
        const node = new Node(item);
        node.value = item;

        if (this.tail) {
            this.tail.next = node;
        }

        this.tail = node;

        if (! this.head) {
            this.head = node;
        }

        this._size++;

        return item;
    }

    pop() {
        if (this.size() === 0) {
            return;
        }

        const item = this.head.value;
        this.head = this.head.next;
        this._size--;
        return item;
    }

    peek() {
        return this.head.value;
    }

    size() {
        return this._size;
    }
}

class QueueStdout {
    constructor(queue) {
        this.queue = queue;
    }

    put(item) {
        this.queue.push(item);
    }

    get() {
        if (this.queue.size() === 0) {
            process.stdout.write('error\n');
        } else {
            process.stdout.write(String(this.queue.pop()) + '\n');
        }
    }

    size() {
        process.stdout.write(String(this.queue.size()) + '\n');
    }
}

function solve() {
    const commandsCount = readNumber();
    const queue = new QueueStdout(new QueueList());

    for (let i = 0; i < commandsCount; i++) {
        const [command, arg] = readArray();

        queue[command](Number(arg));
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
