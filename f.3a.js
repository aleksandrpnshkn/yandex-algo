/*
 * ID успешной посылки: 63440054
 *
 * На основе бинарного поиска
 * Общая сложность - O(log n)
 * Доп. память - О(1) для пары вспомогательных переменных
 *
 * Описание:
 *  Т.к. первый элемент больше любого элемента второго массива, то можно понять в какой части сейчас искомый и проверяемый элементы.
 *  Зная это получается такой алгоритм:
 *      - убедиться что проверяемый и искомый элементы в одном массиве, если нет - двигаемся в сторону массива, в котором искомый
 *      - стандартная проверка на > или < для бинарного поиска
 */

function brokenSearch(arr, k) {
    return searchBinary(k, arr);
}

function searchBinary(needle, arr, left = 0, right) {
    if (right === undefined) {
        right = arr.length;
    }

    // закешировать
    const needleInFirstPart = needle >= arr[0];

    return (function _searchBinary(needle, arr, left, right) {
        if (left === right) {
            return -1;
        }

        const midIndex = Math.floor((left + right) / 2);
        const mid = arr[midIndex];
        const midInFirstPart = mid >= arr[0];

        if (needle === arr[midIndex]) {
            return midIndex;
        }

        if (
            needleInFirstPart && ! midInFirstPart
            || needleInFirstPart && midInFirstPart && needle < mid
            || ! needleInFirstPart && ! midInFirstPart && needle < mid
        ) {
            return _searchBinary(needle, arr, left, midIndex);
        }

        return _searchBinary(needle, arr, midIndex + 1, right);
    })(needle, arr, left, right);
}
