// ID успешной посылки 69107181

/*
 * -- ПРИНЦИП РАБОТЫ --
 * Двойная динамика, где в качестве значения хранится наименьшее число операций для префиксов данных строк.
 * В случае совпадения символа - берется как есть результат для подстрок без нового символа из [i - 1][k - 1].
 * Иначе берется самый оптимальный вариант из [i][k - 1] / [i - 1][k] / [i - 1][k - 1] и инкрементится.
 *
 * В каемочке хранится количество изменений в худшем случае для использования в первой строке/столбце.
 *
 * Ответ на вопрос - в конце динамики.
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * На примере динамики с индексами i и k (т.е. dp[i][k]):
 *
 * Базовый случай - пустые строки. i == 0 и k == 0.
 * Изменений нет, поэтому в каемке [0][0] уже хранится 0 (столько изменений для приведения пустых строк).
 * Далее каемочки инкрементятся в соответствии с худшим случаем - т.е. [0][k] будет гарантированно содержать k - столько изменений нужно чтобы привести пустую строку к строке длинной k (или наоборот, если удалять символы).
 *
 * Теперь пусть i == 1 и k == 1.
 *
 *   Если символы не равны, будет взят наименьший результат из уже вычисленных:
 *      - [i][k - 1] или [i - 1][k] для вставки/удаления
 *      - [i - 1][k - 1] для замены символа
 *   Соответственно к значению добавится 1. Как и для базового случая, значение будет инкрементится в случае отсутствия совпадений на 1 до конца, соответствуя количеству необходимых изменений.
 *
 *   Если символы равны, будет взят как есть результат для подстрок [i - 1][k - 1], в данном случае базового случая, т.е. 0.
 *   Если все прочие символы в строках различаются, это значение гарантированно дойдет до конца динамики как наименьшее как наилучший возможный сценарий.
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Пусть s1 и s2 - длины строк
 *
 * Создание и заполнение atomicChangesDP - O(s1 * s2)
 *
 * Итого на программу: O(s1 * s2)
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 *
 * Двумерный массив atomicChangesDP - O(s1 * s2)
 *
 * Итого на программу: O(s1 * s2)
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
    const chars1 = inputLines[0].split('');
    const chars2 = inputLines[1].split('');

    const atomicChangesDP = new Array(chars1.length + 1);

    // добавить каемочку из целых чисел от 0 до n
    atomicChangesDP[0] = new Array(chars2.length + 1);

    // заполнить каемочку сверху
    for (let i = 0; i <= chars2.length; i++) {
        atomicChangesDP[0][i] = i;
    }

    for (let i = 1; i < atomicChangesDP.length; i++) {
        atomicChangesDP[i] = new Array(chars2.length + 1);

        // заполнить каемочку слева
        atomicChangesDP[i][0] = i;
    }

    for (let i = 1; i <= chars1.length; i++) {
        const char1 = chars1[i - 1];

        for (let k = 1; k <= chars2.length; k++) {
            const char2 = chars2[k - 1];

            if (char1 === char2) {
                // при совпадении символов не будет изменений
                atomicChangesDP[i][k] = atomicChangesDP[i - 1][k - 1];
            } else {
                // если символы не совпали - выбирается самый оптимальный способ:
                //     - [i][k - 1] и [i - 1][k] отвечают за вставку/удаление символа
                //     - [i - 1][k - 1] отвечает за замену символа на новый
                //
                // +1 к сложности для любой операции
                atomicChangesDP[i][k] = Math.min(atomicChangesDP[i - 1][k - 1], atomicChangesDP[i][k - 1], atomicChangesDP[i - 1][k]) + 1;
            }
        }
    }

    process.stdout.write(atomicChangesDP[chars1.length][chars2.length] + '\n');
}
