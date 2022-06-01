// ID успешной посылки 68702230

/*
 * -- ПРИНЦИП РАБОТЫ --
 * Граф хранится в смежном списке.
 * Для хранения добавленных в остов вершин используется массив.
 * Для хранения ребер-кандидатов, инцидентных добавленным в остов вершинам, используется куча.
 * Считается что в графе несколько компонент связности, если ребер-кандидатов уже нет, но при этом остались недобавленные вершины.
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Отличие от описанного в теории минимального остовного дерева только в выборе веса и в дополнительной проверке на связность.
 * В остальном суть задачи правильно подобрать структуры данных:
 *  - смежный список adjacentList для эффективного добавления инцидентных ребер в ребра-кандидаты
 *  - массив addedVertices для проверки добавлена ли вершина за O(1)
 *  - куча edgesMaxHeapByWeight для эффективного хранения и извлечения ребер
 *
 * Проверка на связность:
 *  В алгоритме добавляются все инцидентные ребра обойденных вершин.
 *  Если в куче не осталось ребер, значит у вершин нет инцидентных ребер.
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Создание и заполнение смежного списка adjacentList, распределение всех ребер E по вершинам V - O(V + E)
 *
 * Добавление всех ребер в кучу edgesMaxHeapByWeight - O(E log E)
 * Ребер в остове V - 1, значит, извлечение ребер для остова - O (V log V)
 * Итого на кучу: O((E + V) * log(E + V))
 *
 * Итого на программу: O((E + V) * log(E + V))
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * Память для инпута inputLines - O(E)
 * Память для кучи adjacentList - O(E), т.к. в худшем случае в куче будут все ребра
 *  (если все вершины в графе смежны стартовой, как в топологии "звезда")
 * Память для смежного списка - O(V + E)
 * Память для addedVertices - O(V)
 *
 * Итого на программу - O(V + E)
 */

const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const inputLines = [];

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    const [verticesCount, edgesCount] = splitInputLineToNumbers(0);

    // создать и заполнить смежный список
    const adjacentList = new Array(verticesCount + 1);

    for (let i = 1; i < inputLines.length; i++) {
        const [fromVertex, toVertex, weight] = splitInputLineToNumbers(i);

        if (adjacentList[fromVertex] === undefined) {
            adjacentList[fromVertex] = [];
        }

        if (adjacentList[toVertex] === undefined) {
            adjacentList[toVertex] = [];
        }

        adjacentList[fromVertex].push({
            toVertex,
            weight,
        });

        adjacentList[toVertex].push({
            toVertex: fromVertex,
            weight,
        });
    }

    let addedVerticesCount = 0;

    let edgesMaxHeapByWeight = new Heap((edge1, edge2) => edge1.weight < edge2.weight);
    let maxSpanningTreeWeight = 0;

    const addedVertices = new Array(verticesCount + 1);
    addedVertices.fill(false);
    addedVertices[0] = undefined;

    const startVertex = 1;
    addVertex(startVertex);

    // повторять пока не добавлены все вершины
    while (addedVerticesCount < verticesCount) {
        const heaviestEdge = getHeaviestEdge();

        // если не найдено ребро и остались недобавленные вершины, значит это несвязный граф
        if (heaviestEdge === undefined) {
            process.stdout.write(String('Oops! I did it again\n'));
            return;
        }

        maxSpanningTreeWeight += heaviestEdge.weight;
        addVertex(heaviestEdge.toVertex);
    }

    process.stdout.write(String(maxSpanningTreeWeight + '\n'));

    function addVertex(vertex) {
        addedVertices[vertex] = true;
        addedVerticesCount++;

        // добавить инцидентные ребра в кучу
        if (adjacentList[vertex]) {
            adjacentList[vertex]
                // отфильтровать сразу ребра, у которых уже добавлены обе вершины
                .filter((edge) => ! addedVertices[edge.toVertex])
                .forEach((edge) => edgesMaxHeapByWeight.push(edge));
        }
    }

    function getHeaviestEdge() {
        while (edgesMaxHeapByWeight.size() > 0) {
            const edge = edgesMaxHeapByWeight.pop();

            // вторая вершина ребра уже могла быть добавлена, проверить что это не так
            if (! addedVertices[edge.toVertex]) {
                return edge;
            }
        }
    }
}

function splitInputLineToNumbers(lineIndex) {
    return inputLines[lineIndex].split(' ').map(Number);
}

/**
 * Реализация кучи из прошлой финальной задачи
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
