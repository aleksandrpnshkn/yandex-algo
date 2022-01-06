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

class Diffs {
    constructor(maxSize) {
        this._items = [];
        this._maxSize = maxSize;
    }

    push(diff) {
        if (this.isFull()) {
            if (diff >= this.getMax()) {
                return;
            }

            this._items[0] = diff;

            for (let i = 1; i < this.size(); i++) {
                if (this._items[i] <= this._items[i-1]) {
                    break;
                }

                [this._items[i-1], this._items[i]] = [this._items[i], this._items[i-1]];
            }
        } else {
            this._items.push(diff);

            for (let i = this.size() - 1; i > 0; i--) {
                if (this._items[i] <= this._items[i-1]) {
                    break;
                }

                [this._items[i-1], this._items[i]] = [this._items[i], this._items[i-1]];
            }
        }
    }

    getMax() {
        if (this.isEmpty()) {
            return -Infinity;
        }

        return this._items[0];
    }

    size() {
        return this._items.length;
    }

    isEmpty() {
        return this._items.length === 0;
    }

    isFull() {
        return this.size() >= this._maxSize;
    }
}

function solve() {
    readNumber();
    const areas = readNumericArray();
    const k = readNumber();

    const diffs = new Diffs(k);

    for (let i = 0; i < areas.length; i++) {
        for (let j = areas.length - 1; j >= i + 1; j--) {
            const diff = Math.abs(areas[i] - areas[j]);

            diffs.push(diff);
        }
    }

    process.stdout.write(String(diffs.getMax()) + '\n');
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readNumericArray() {
    const arr = inputLines[curLine].trim().split(' ').map((num) => Number(num));
    curLine++;
    return arr;
}
