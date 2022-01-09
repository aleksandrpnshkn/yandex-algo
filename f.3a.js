/*
 * ID успешной посылки: 63493023
 *
 *
 * -- ПРИНЦИП РАБОТЫ --
 * На основе бинарного поиска
 *
 * Т.к. первый элемент больше любого элемента второго массива, то можно понять в какой части сейчас искомый и проверяемый элементы.
 * Зная это получается такой алгоритм:
 *      - убедиться что проверяемый и искомый элементы в одном массиве, если нет - двигаемся в сторону массива, в котором искомый
 *      - стандартная проверка на равенство для бинарного поиска
 *
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Перед проверкой на равенство добавляется проверка на нахождение в правильном массиве.
 * Это гарантирует что поиск не уйдет в неправильном направлении.
 *
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Проверка элемента занимает O(1) за шаг рекурсии. Всего шагов - log n.
 * Итоговая сложность: O(log n)
 *
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * O(1) для пары вспомогательных переменных на шаг рекурсии.
 * Итоговая сложность: O(log n)
 */

function brokenSearch(arr, k) {
    const needleInFirstPart = k >= arr[0];

    return searchBinaryBroken(k, arr, 0, arr.length, needleInFirstPart);
}

function searchBinaryBroken(needle, arr, left, right, needleInFirstPart) {
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
        return searchBinaryBroken(needle, arr, left, midIndex, needleInFirstPart);
    }

    return searchBinaryBroken(needle, arr, midIndex + 1, right, needleInFirstPart);
}
