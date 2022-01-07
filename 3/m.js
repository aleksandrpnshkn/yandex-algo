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
    readNumber();
    readNumber();
    const north = readNumericArray();
    const south = readNumericArray();

    process.stdout.write(String(getMedian(north, south)) + '\n');
}

function getMedian(arr1, arr2) {
    let medianPos = getRawMedian(arr1, arr2);

    if (! medianPos) {
        medianPos = getRawMedian(arr2, arr1);
    }

    if (medianPos.length > 1) {
        return (medianPos[0] + medianPos[1]) / 2;
    }

    return medianPos[0];
}

function getRawMedian(arr1, arr2, left1 = 0, right1) {
    if (right1 === undefined) {
        right1 = arr1.length;
    }

    if (left1 === right1) {
        return false;
    }

    const midPos = Math.floor((left1 + right1) / 2);

    // Считаем пока будто значение для медианы только одно и будем искать позицию для вставки во втором массиве (это упростит по идее пока что код).
    // Медиана должна делить пополам, поэтому mid1 и mid2 должны делить свои массивы так, чтобы сложив left1Len + left2Len === right1Len + right2Len.
    let posToInsertMedian = Math.floor(arr2.length / 2) - (midPos - Math.floor(arr1.length / 2));

    if (arr1.length % 2 === 0 && arr2.length % 2 === 0) {
        posToInsertMedian--;
    }

    const curr = arr1[midPos];
    const prevInsert = arr2[posToInsertMedian - 1];
    const nextInsert = arr2[posToInsertMedian];

    // Проверить что позиция для вставки существует (на случай если текущий массив больше массива для вставки). Если нет - сдвигаем.
    // Проверить что полученная позиция для вставки подходит по значениям. Если нет - сдвигаем.

    if (
        (posToInsertMedian > arr2.length)
        || (prevInsert !== undefined && prevInsert > curr)
    ) {
        // сдвинуть midPos вправо
        return getRawMedian(arr1, arr2, midPos + 1, right1);
    }

    if (
        (posToInsertMedian < 0)
        || (nextInsert !== undefined && nextInsert < curr)
    ) {
        // сдвинуть midPos влево
        return getRawMedian(arr1, arr2, left1, midPos);
    }

    const next = arr1[midPos+1];

    if ((arr1.length + arr2.length) % 2 === 0) {
        if (nextInsert === undefined) {
            mid2 = next;
        } else if (next === undefined) {
            mid2 = nextInsert;
        } else {
            mid2 = Math.min(next, nextInsert);
        }

        return [curr, mid2];
    }

    return [curr];
}

module.exports = {
    getMedian,
    getRawMedian,
};

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
