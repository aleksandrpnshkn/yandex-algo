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

class QueueSized {
    constructor(maxSize) {
        this.items = new Array(maxSize);
        this.headIndex = 0;
        this.tailIndex = 0;
        this.maxSize = maxSize;
        this._size = 0;
    }

    push(item) {
        if (this.size() === this.maxSize) {
            throw new Error();
        }

        this.items[this.tailIndex] = item;
        this.tailIndex = (this.tailIndex + 1) % this.maxSize;
        this._size++;
        return item;
    }

    pop() {
        if (this.size() === 0) {
            return;
        }

        const item = this.items[this.headIndex];
        this.items[this.headIndex] = undefined;
        this.headIndex = (this.headIndex + 1) % this.maxSize;
        this._size--;
        return item;
    }

    peek() {
        return this.items[this.headIndex];
    }

    size() {
        return this._size;
    }
}

class QueueSizedStdout {
    constructor(queue) {
        this.queue = queue;
    }

    push(item) {
        try {
            this.queue.push(item);
        } catch {
            process.stdout.write('error\n');
        }
    }

    pop() {
        if (this.queue.size() === 0) {
            process.stdout.write('None\n');
        } else {
            process.stdout.write(String(this.queue.pop()) + '\n');
        }
    }

    peek() {
        if (this.queue.size() === 0) {
            process.stdout.write('None\n');
        } else {
            process.stdout.write(String(this.queue.peek()) + '\n');
        }
    }

    size() {
        process.stdout.write(String(this.queue.size()) + '\n');
    }
}

function solve() {
    const commandsCount = readNumber();
    const queueSize = readNumber();
    const queue = new QueueSizedStdout(new QueueSized(queueSize));

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
