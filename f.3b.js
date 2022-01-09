/*
 * ID успешной посылки: 63495237
 *
 *
 * -- ПРИНЦИП РАБОТЫ --
 * Общая идея алгоритма расписана в самой задаче.
 * pivot выбирается рандомно, за счет чего среднее количество шагов равно log n.
 * Сортировка работает только с уникальными значениями (в данном случае логин уникален)
 *
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Т.к. значения уникальны, то указатели обязательно встретятся в одной точке, разделяя значения на less и greater
 *
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * n - длина сортируемого массива.
 * На каждом шаге рекурсии перебирается n элементов. Всего шагов log n. Т.е. log n шагов по n элементов.
 * Итоговая сложность сортировки: O(n log n)
 *
 * Подготовка массива
 *
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * Промежуточные массивы не создаются, т.к. массив сортируется на месте.
 * Но есть O(1) для пары вспомогательных переменных на шаг рекурсии.
 * Т.к. память не освобождается до выхода из рекурсии, то итоговый расход памяти в сортировке - O(log n).
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
            row = row.split(' ');

            return {
                name: row[0],
                tasks: Number(row[1]),
                penalty: Number(row[2]),
            };
        });

    quickSortInPlace(isBetter, table, 0, rowsCount);

    table.forEach((row) => {
        process.stdout.write(row.name + '\n');
    });
}

function quickSortInPlace(isLess, arr, start, end) {
    if (end - start < 2) {
        return;
    }

    const pivot = arr[Math.floor(Math.random() * (end - start) + start)];

    let leftPos = start;
    let rightPos = end - 1;

    while (true) {
        while (
            leftPos < rightPos
            && isLess(arr[leftPos], pivot)
        ) {
            leftPos++;
        }

        while (
            rightPos > leftPos
            && isLess(pivot, arr[rightPos])
        ) {
            rightPos--;
        }

        if (leftPos === rightPos) {
            break;
        }

        [arr[leftPos], arr[rightPos]] = [arr[rightPos], arr[leftPos]];
    }

    quickSortInPlace(isLess, arr, start, leftPos);
    quickSortInPlace(isLess, arr, rightPos, end);
}

function isBetter(row, thanRow) {
    return row.tasks > thanRow.tasks
        || row.tasks === thanRow.tasks && row.penalty < thanRow.penalty
        || row.tasks === thanRow.tasks && row.penalty === thanRow.penalty && row.name < thanRow.name;
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
