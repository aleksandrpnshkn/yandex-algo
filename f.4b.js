/*
 * ID успешной посылки: 64693752
 *
 *
 * -- ПРИНЦИП РАБОТЫ --
 * Хэш-таблица с разрешением коллизий методом цепочек.
 * Цепочки сделаны на основе двусвязных списков.
 * В корзинах, не важно есть коллизии или нет, находятся списки.
 * Корзина определяется методом деления.
 * Хэш-функция не используется.
 *
 * Класс Output вспомогательный, нужен для оптимизации построчного вывода.
 *
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Хэш-функция не используется, т.к. ожидаются целочисленные значения.
 * В качестве максимального размера таблицы (количества корзин) используется простое число, чтобы немного снизить вероятность кластеризации.
 * С двусвязным списком удобнее удалять элемент из произвольного места без лишних переменных.
 * Новые элементы всегда добавляются в начало списка, что обеспечивает O(1) при добавлении.
 *
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Возможно что таблица будет состоять целиком из коллизий одной корзины.
 * При добавлении в корзину с коллизиями потребуется O(n) чтобы проверить существует ли уже ключ.
 * Значит добавление элемента в худшем случае - O(n), где n - количество put операций.
 * Для получения и удаления так же понадобится перебор всей корзины, поэтому сложность тоже O(n), где n - количество соответствующих операций.
 *
 * Но в среднем распределение корзин будет +- равномерное и операции будут выполняться за O(1).
 *
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * В хэш-таблице по условиям задачи для простоты реализации допускается массив корзин фиксированного размера.
 * Если убрать это допущение, то количество корзин будет O(n), где n - количество put-операций.
 * В худшем случае понадобится еще O(n) для коллизий в одной корзине.
 * Т.е. максимум O(2n), сложность линейная.
 */

const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

class Output {
    constructor() {
        this._output = '';
    }

    addLine(line) {
        this._output += line + '\n';
    }

    isFull() {
        this._output.length >= 1000;
    }

    print() {
        process.stdout.write(this._output);
        this._output = '';
    }
}

class Bucket {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }

    remove() {
        if (this.prev) {
            this.prev.next = this.next;
        }

        if (this.next) {
            this.next.prev = this.prev;
        }
    }
}

const NOT_FOUND_VALUE = 'None';

class HashTable {
    constructor(size) {
        this._size = size;
        this._buckets = new Array(size);
    }

    put(key, value) {
        const bucketIndex = this._getBucketIndex(key);
        const newBucket = new Bucket(key, value);
        const headBucket = this._buckets[bucketIndex];

        if (headBucket) {
            const existedBucket = this._searchInCollisions(key, headBucket);

            if (existedBucket) {
                existedBucket.value = value;
                return;
            }

            newBucket.next = headBucket;
            headBucket.prev = newBucket;
        }

        this._buckets[bucketIndex] = newBucket;
    }

    get(key) {
        const bucketIndex = this._getBucketIndex(key);
        const headBucket = this._buckets[bucketIndex];

        if (! headBucket) {
            return NOT_FOUND_VALUE;
        }

        const bucket = this._searchInCollisions(key, headBucket);

        return bucket ? bucket.value : NOT_FOUND_VALUE;
    }

    delete(key) {
        const bucketIndex = this._getBucketIndex(key);
        const headBucket = this._buckets[bucketIndex];

        if (! headBucket) {
            return NOT_FOUND_VALUE;
        }

        const bucketToDelete = this._searchInCollisions(key, headBucket);

        if (! bucketToDelete) {
            return NOT_FOUND_VALUE;
        }

        if (bucketToDelete === headBucket) {
            this._buckets[bucketIndex] = bucketToDelete.next || undefined;
        }

        bucketToDelete.remove();

        return bucketToDelete.value;
    }

    _getBucketIndex(key) {
        return key % this._size;
    }

    _searchInCollisions(key, bucket) {
        while (bucket) {
            if (key === bucket.key) {
                return bucket;
            }

            bucket = bucket.next;
        }

        return null;
    }
}

const MAX_HASH_TABLE_PRIME_SIZE = 99991;

const output = new Output();

process.stdin.on('end', () => output.print());

reader.once('line', (queriesCount) => {
    let currentQueryNumber = 0;

    const employers = new HashTable(MAX_HASH_TABLE_PRIME_SIZE);

    reader.on('line', (queryStr) => {
        currentQueryNumber++;

        if (currentQueryNumber > queriesCount) {
            return;
        }

        const query = queryStr.split(' ');

        const result = runQuery({
            methodName: query[0],
            args: query.slice(1),
        }, employers);

        if (! result) {
            return;
        }

        output.addLine(result);

        if (output.isFull()) {
            output.print();
        }
    });
});

function runQuery(query, hashTable) {
    let result;

    switch (query.methodName) {
        case 'put': {
            hashTable.put(...query.args);
            break;
        }
        case 'get': {
            result = hashTable.get(query.args[0]);
            break;
        }
        case 'delete': {
            result = hashTable.delete(query.args[0]);
            break;
        }
    }

    return result;
}
