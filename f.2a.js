// ID успешной посылки 60825242

/*
 * -- ПРИНЦИП РАБОТЫ --
 *
 * Дек на основе массива постоянного размера по принципу кольцевого буфера
 * (из урока "Структура данных очередь. Реализация")
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 *
 * Добавлять и извлекать элементы можно с обеих сторон массива.
 * Переполнение массива отслеживается, поэтому коллизий, когда один элемент затер другой, не будет.
 * За счет перевода указателей из начала в конец и наоборот обеспечивается неограниченное добавление элементов,
 *  при условии своевременного удаления элементов с другого конца.
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 *
 * push - O(1), т.к. прямое присваивание по индексу без реаллокаций, пара операций с индексом и счетчиками
 * pop - O(1), т.к. прямое удаление по индексу без реаллокаций
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 *
 * O(n) памяти, где n - максимальное число элементов в деке
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

class DequeSized {
    /**
     * @param {number} maxSize
     */
    constructor(maxSize) {
        this._items = new Array(maxSize);

        // полуинтервал - back указывает на текущий, а front на индекс для нового элемента
        this._backIndex = 0;
        this._frontIndex = 0;

        this._size = 0;
        this._maxSize = maxSize;
    }

    push_back(item) {
        if (this._isFull()) {
            throw new Error('Дек заполнен');
        }

        if (this._backIndex === 0) {
            this._backIndex = this._maxSize - 1;
        } else {
            this._backIndex--;
        }

        this._items[this._backIndex] = item;
        this._size++;
    }

    push_front(item) {
        if (this._isFull()) {
            throw new Error('Дек заполнен');
        }

        this._items[this._frontIndex] = item;
        this._frontIndex = (this._frontIndex + 1) % this._maxSize;
        this._size++;
    }

    pop_back() {
        if (this._isEmpty()) {
            throw new Error('Дек пуст');
        }

        const item = this._items[this._backIndex];
        delete this._items[this._backIndex];
        this._backIndex = (this._backIndex + 1) % this._maxSize;
        this._size--;

        return item;
    }

    pop_front() {
        if (this._isEmpty()) {
            throw new Error('Дек пуст');
        }

        if (this._frontIndex === 0) {
            this._frontIndex = this._maxSize - 1;
        } else {
            this._frontIndex--;
        }

        const item = this._items[this._frontIndex];
        delete this._items[this._frontIndex];
        this._size--;

        return item;
    }

    size() {
        return this._size;
    }

    _isFull() {
        return this._size >= this._maxSize;
    }

    _isEmpty() {
        return this._size === 0;
    }
}

process.stdin.on('end', solve);

function solve() {
    const commandsCount = readNumber();
    const dequeSize = readNumber();
    const deque = new DequeSized(dequeSize);

    for (let i = 0; i < commandsCount; i++) {
        const [command, arg] = readArray();

        try {
            const result = deque[command](arg);

            if (result === undefined) {
                continue;
            }

            process.stdout.write(String(result) + '\n');
        } catch (error) {
            const errorMessage = process.env.DEBUG ? error.message + '\n' : 'error\n';
            process.stdout.write(errorMessage);
        }
    }
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}

function readArray() {
    const arr = inputLines[curLine].trim().split(' ');
    curLine++;
    return arr;
}
