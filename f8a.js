// ID успешной посылки 69267535

/*
 * -- ПРИНЦИП РАБОТЫ --
 * Строки распаковываются рекурсивно. Префикс проверяется в цикле посимвольно во всех строках.
 *
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Базовый случай - строка без вложенных запакованных строк.
 * Такая строка повторяется нужное количество раз и возвращается в предыдущий вызов по стеку.
 *
 * Заметить новую запакованную строку можно по цифре, т.к. в распакованной строке только буквы.
 *
 * Функция также возвращает индекс закрывающей скобки, по которой можно продолжить парсинг строки.
 *
 * В худшем случае, при множестве вложений строки 1[a] друг в друга (20к символов до распаковки, 5к символов после, глубина 5к вызовов) возможно переполнение стека, но в данном случае решение удовлетворяет требованиям.
 *
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * packed - запакованная строка
 * unpacked - распакованная строка
 *
 * getLongestCommonPrefix() - O(длина минимальной unpacked * количество packed)
 *
 * repeatString() - O(количество повторов * длину шаблонов)
 *
 * unpack() - Глубина рекурсии зависит от количества вложенных packed.
 * Перебор символов в вызове unpack зависит от длины packed.
 * repeatString() повторяется только в конце цикла, поэтому помимо собственной сложности зависит только от количества вложенных packed.
 * Итого сложность unpack - O(глубина packed * длина unpacked * количество повторов в packed)
 *
 * unpack() вызывается в цикле, длиной в количество packed.
 *
 * Итого сложность программы O(количество packed * глубина packed * длина unpacked * количество повторов в packed)
 *
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * Вне unpack() хранятся только массивы с inputLines/packedStrings/unpackedStrings - O(количество packed).
 *
 * Внутри рекурсии массив unpacked.string не зависит от глубины рекурсии, а только от длины корневой unpacked.
 *
 * packed передается в рекурсию по ссылке, поэтому глубина рекурсии на работу с packed не влияет.
 *
 * Итого сложность программы O(количество packed * длину unpacked)
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
    const packedStrings = inputLines.slice(1);

    const unpackedStrings = packedStrings
        // решил что быстрее будет добавить доп.скобочку, чем доп.условие в if, хотя с условием кажется было бы "почище"
        .map((str) => {
            arr = str.split('');
            arr.push(']');
            return unpack(arr).string;
        });

    let longestCommonPrefix = getLongestCommonPrefix(unpackedStrings);

    process.stdout.write(longestCommonPrefix + '\n');
}

/**
 * Получает запакованную строку только с закрывающейся скобкой.
 * Например для строки '2[ab]' функция получит 'ab]'
 *
 * @param {Array} packed
 * @param {Number} fromIndex - индекс начала запакованной строки
 * @param {Number} multiplier - число повторений строки
 * @returns
 */
function unpack(packed, fromIndex = 0, multiplier = 1) {
    let unpacked = {
        string: '',
        closeBracketIndex: 0,
    };

    for (let i = fromIndex; i < packed.length; i++) {
        const currentChar = packed[i];

        // в "корне" рекурсии тоже должна быть закрывающая скобка
        if (currentChar === ']') {
            unpacked.closeBracketIndex = i;
            unpacked.string = repeatString(unpacked.string, multiplier);
            return unpacked;
        }

        const isInnerPacked = ! isNaN(Number(currentChar));

        if (isInnerPacked) {
            const innerMultiplier = Number(currentChar);
            const innerUnpacked = unpack(packed, i + 2, innerMultiplier);
            unpacked.string += innerUnpacked.string;
            i = innerUnpacked.closeBracketIndex;

            continue;
        }

        unpacked.string += currentChar;
    }

    throw new Error('Некорректная строка');
}

function repeatString(string, times) {
    let result = string;

    while (times > 1) {
        result += string;
        times--;
    }

    return result;
}

function getLongestCommonPrefix(strings) {
    let prefix = strings[0];

    for (let charIndex = 0; charIndex < prefix.length; charIndex++) {
        for (let stringIndex = 1; stringIndex < strings.length; stringIndex++) {
            if (strings[stringIndex][charIndex] !== prefix[charIndex]) {
                prefix = prefix.slice(0, charIndex);
                break;
            }
        }
    }

    return prefix;
}
