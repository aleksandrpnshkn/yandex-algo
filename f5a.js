// ID успешной посылки 65924067

/*
 * -- ПРИНЦИП РАБОТЫ --
 * Куча Heap использует дерево на массиве для хранения бинарного неупорядоченного дерева.
 * Компаратор isLower используется для сортировки элементов.
 * При добавлении в кучу элемент сразу "просеивается" вверх, на случай если добавился самый актуальный элемент.
 * При извлечении элемента из кучи, на его место встает последний элемент (лист).
 * После этого лист "просеивается" вниз, поднимая вверх актуальный элемент.
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Благодаря "просеиванию" (сортировке) при добавлении и извлечении элементов поддерживается отсортированность элементов в вершинах по вертикали.
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Сложность добавления и извлечения элемента в куче - O(h), где h - высота дерева.
 * Т.к. элементы заполняют структуру равномерно, и дерево остаётся сбалансированным по высоте, то сложность логарифмическая.
 *
 * Т.к. эта операция выполняется при переборе всех элементов, то итоговая сложность O(n log n), где n - количество строк в таблице.
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * Затраты на кучу - O(n), где n - количество строк в таблице.
 */

class Heap {
    /**
     * @param {Function} isLower - компаратор, который определяет что A должно стоять в дереве ниже чем B
     */
    constructor(isLower) {
        this._items = [-1];
        this._isLower = isLower;
    }

    pop() {
        const top = this._items[1];
        const last = this._items.pop();

        if (this.size() > 0) {
            this._items[1] = last;
            this._siftDown();
        }

        return top;
    }

    push(item) {
        const idx = this._items.push(item) - 1;
        this._siftUp(idx);
    }

    size() {
        return this._items.length - 1;
    }

    isEmpty() {
        return this.size() === 0;
    }

    _isLowerOrEqual(a, b) {
        return ! this._isLower(b, a);
    }

    _siftUp(idx) {
        const parentIdx = Math.floor(idx / 2);

        if (parentIdx < 1) {
            return idx;
        }

        if (this._isLower(this._items[idx], this._items[parentIdx])) {
            return idx;
        }

        [this._items[idx], this._items[parentIdx]] = [this._items[parentIdx], this._items[idx]];
        return this._siftUp(parentIdx);
    }

    _siftDown(idx = 1) {
        const leftIdx = idx * 2;
        const rightIdx = leftIdx + 1;
        const left = this._items[leftIdx];
        const right = this._items[rightIdx];

        if (left === undefined && right === undefined) {
            return idx;
        }

        if (
            (left === undefined || this._isLowerOrEqual(left, this._items[idx]))
            && (right === undefined || this._isLowerOrEqual(right, this._items[idx]))
        ) {
            return idx;
        }

        if (right === undefined || this._isLowerOrEqual(right, left)) {
            [this._items[idx], this._items[leftIdx]] = [this._items[leftIdx], this._items[idx]];
            idx = leftIdx;
        } else {
            [this._items[rightIdx], this._items[idx]] = [this._items[idx], this._items[rightIdx]];
            idx = rightIdx;
        }

        return this._siftDown(idx);
    }
}

const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const leadershipHeap = new Heap(isLower);

reader.once('line', (participantsLeft) => {
    reader.on('line', (rawParticipant) => {
        if (participantsLeft === 0) {
            return;
        }

        let participant = rawParticipant.split(' ');

        leadershipHeap.push({
            name: participant[0],
            score: Number(participant[1]),
            penalty: Number(participant[2]),
        });

        participantsLeft--;
    });
});

process.stdin.on('end', printLeaders);

function printLeaders() {
    while (! leadershipHeap.isEmpty()) {
        process.stdout.write(leadershipHeap.pop().name + '\n');
    }

    // вставка - добавление в конец массива и поднятие в дереве
    // удаление - достаем самый первый элемент, на его место ставим последний, и просеиваем его вниз
}

function isLower(a, b) {
    if (a.score === b.score) {
        if (a.penalty === b.penalty) {
            return a.name > b.name;
        }

        return a.penalty > b.penalty;
    }

    return a.score < b.score;
}
