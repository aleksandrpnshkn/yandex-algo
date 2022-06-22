// ID успешной посылки 69054724

/*
 * -- ПРИНЦИП РАБОТЫ --
 * Задача аналогична задаче о рюкзаке и "Золото леприконов". Размер "рюкзака" - половина от суммы очков всех матчей.
 * В качестве динамики используется prevSums и currSums - это последние две строки двухмерной динамики.
 * Значение динамики - максимум вмещаемых в "рюкзак" (maxSum) очков для текущего подмножества матчей (matchIndex).
 *
 * Ответ на вопрос выясняется в процессе заполнения динамики. Как только рюкзак заполнился - вернется True.
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * matchIndex = 1. Заполнится рюкзак, где maxSum == количеству очков в матче. Т.к. проверялся единственный матч, то это максимум
 * matchIndex = 2. Если рюкзак maxSum > количества очков в матче, то остается свободное место. Для заполнения свободного места берется лучший результат из предыдущей итерации. Таким образом свободное место в рюкзаке maxSum для данного подмножества матчей стремится к 0.
 * matchIndex = n. В предыдущей итерации рюкзаки забиты по максимуму. Если в данной итерации рюкзак maxSum не заполняется, значит очки пополам не делятся.
 *
 * Если рюкзак оказался полон. Значит гарантированно остались матчи, которые составляют другую половину по очкам
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * n - количество матчей
 *
 * getSum - O(n)
 * Динамика - O(n^2)
 * Итого: O(n^2)
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * Динамика - два массива, значит O(n)
 */

const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

const inputLines = [];
let currLine = 0;

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    skipLine();
    const matches = readNumberArray();

    // нужно узнать могу ли я заполнить половинчатый рюкзак
    const pointsTotal = getSum(matches);

    if (pointsTotal % 2 === 1) {
        process.stdout.write('False\n');
        return;
    }

    const pointsTotalHalf = pointsTotal / 2;

    let prevSums;
    // добавить каемочку
    let currSums = new Array(pointsTotalHalf + 1);
    currSums.fill(0);

    for (let matchIndex = 1; matchIndex <= matches.length; matchIndex++) {
        prevSums = currSums;
        currSums = new Array(pointsTotalHalf + 1);

        // добавить каемочку
        currSums[0] = 0;

        const points = matches[matchIndex - 1];

        for (let maxSum = 1; maxSum <= pointsTotalHalf; maxSum++) {
            const pointsLeft = maxSum - points;

            const prevPointsSum = prevSums[maxSum];
            let currPointsSum = 0;

            if (points <= maxSum) {
                currPointsSum = points + prevSums[pointsLeft];
            }

            currSums[maxSum] = Math.max(prevPointsSum, currPointsSum);
        }

        if (currSums[currSums.length - 1] === pointsTotalHalf) {
            process.stdout.write('True\n');
            return;
        }
    }

    process.stdout.write('False\n');
    return;
}

function getSum(arr) {
    return arr.reduce((sum, num) => sum + num);
}

function skipLine() {
    currLine++;
}

function readNumberArray() {
    const arr = inputLines[currLine].split(' ').map(Number);
    currLine++;
    return arr;
}
