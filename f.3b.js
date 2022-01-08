/*
 * ID успешной посылки: 63468130
 *
 * Общая сложность сортировки - O(n log n) за счет перебора n элементов на каждом шаге рекурсии (всего шагов log n)
 * Доп. память сортировки - O(1) для пары вспомогательных переменных, массив сортируется на месте
 *
 * Описание:
 *  Общая идея алгоритма расписана в самой задаче.
 *  pivot выбирается рандомно, за счет чего среднее количество шагов равно log n.
 *  Сортировка работает только с уникальными значениями (в данном случае логин уникален)
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

process.stdin.on('end', solve);

function solve() {
    const rowsCount = readNumber();

    const table = inputLines.slice(1, rowsCount + 1)
        .map((row) => {
            return row.trim().split(' ').map((cell, index) => {
                switch (index) {
                    case 1:
                    case 2: return Number(cell);
                    default: return cell;
                }
            });
        });

    quickSortInPlace(table, 0, table.length);

    table.forEach((row) => {
        process.stdout.write(row[0] + '\n');
    });
}

function quickSortInPlace(arr, start, end) {
    if (end - start < 2) {
        return;
    }

    const pivot = arr[Math.floor(Math.random() * (end - start) + start)];

    let leftPos = start;
    let rightPos = end - 1;

    while (true) {
        while (
            leftPos < rightPos
            // можно развить идею и передавать компараторы в аргументах isLess/isGreater, чтобы не привязывать сортировку к конкретной таблице
            && isBetter(arr[leftPos], pivot)
        ) {
            leftPos++;
        }

        while (
            rightPos > leftPos
            && isWorse(arr[rightPos], pivot)
        ) {
            rightPos--;
        }

        if (leftPos === rightPos) {
            break;
        }

        [arr[leftPos], arr[rightPos]] = [arr[rightPos], arr[leftPos]];
    }

    quickSortInPlace(arr, start, leftPos);
    quickSortInPlace(arr, rightPos, end);
}

function isBetter(item, pivotItem) {
    // сперва сравнить по задачам
    return item[1] > pivotItem[1]
        // далее сравнить по штрафу
        || item[1] === pivotItem[1] && item[2] < pivotItem[2]
        // далее по именам
        || item[1] === pivotItem[1] && item[2] === pivotItem[2] && item[0] < pivotItem[0];
}

function isWorse(item, pivotItem) {
    return item[1] < pivotItem[1]
        || item[1] === pivotItem[1] && item[2] > pivotItem[2]
        || item[1] === pivotItem[1] && item[2] === pivotItem[2] && item[0] > pivotItem[0];
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
