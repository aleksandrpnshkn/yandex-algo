// ID успешной посылки 69276617

/*
 * -- ПРИНЦИП РАБОТЫ --
 * Строки для проверки - слова. Проверяемый текст без пробелов - шпаргалка.
 *
 * Слова хранятся в боре trie в развернутом виде.
 * Совпадение слова определяется по терминальной ноде - это первый символ в слове.
 *
 * Шпаргалка проверяется по-префиксно.
 * Результат проверки префикса хранится в одномерном dp (динамическое программирование).
 * Результатом проверки является boolean-флаг - существует ли как минимум одна комбинация слов (в произвольном порядке и с возможными повторами), из которых возможно собрать префикс шпаргалки.
 * Первое true значение в dp будет соответствовать первому совпавшему слову.
 *
 * Суть алгоритма в следующем: если для текущего префикса шпаргалки в боре найдено слово (суффикс), и префикс, идущий до этого суффикса, отмечен как успешный, то можно считать что текущий префикс тоже успешный.
 *
 * Ответ для программы лежит в конце dp - результат для префикса, равного самой строке.
 *
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Первый шаг - проверка слова (суффикса). Благодаря бору проверятся все возможные суффиксы для текущей подстроки. Значит гарантируется что в dp будет как минимум храниться успех для подстрок, равных самому префиксу (комбинация из одного слова). Это базовый случай.
 *
 * Рассмотрим случай для комбинации из двух слов. Допустим в текущей подстроке-шпаргалке text[0,i] нашлось слово-суффикс text(k, i] такое, что dp[k] == true. В dp[k] гарантированно лежит комбинация из одного слова. Значит текущая подстрока-шпаргалка имеет как минимум одну комбинацию, состоящую из двух слов. Это шаг динамики. dp[k] для следующего шага будет означать что существует как минимум одна комбинация из одного или двух слов и так далее. Такой шаг динамики гарантирует что dp будет заполнен true для всех подстрок, имеющих хоть одну комбинацию из слов.
 *
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Trie заполняется посимвольно, значит сложность O(сумма длин слов).
 *
 * Заполение dp состоит из двух циклов. Внешний зависит от длины шпаргалки.
 * Внутренний цикл, для перебора по бору, зависит от длины слов. В худшем случае все слова будут одинаковыми и будут максимальной длины. Шпаргалка при этом будет соотвествовать этим словам. Тогда сложность перебора будет O(длина шпаргалки * длина самого длинного подходящего слова). В лучшем (для цикла) случае в боре вообще не будет подходящих слов.
 *
 * Общая сложность O((длина шпаргалки * длина самого длинного подходящего слова) + сумма длин слов)
 *
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * В худшем случае в боре будет множество уникальных слов. Память будет O(количество слов * средняя длина слов).
 *
 * Кроме этого есть только одномерные массивы.
 * text и dp зависят от длины шпаргалки, т.е. O(длина шпаргалки)
 * inputLines и patterns содержат сами слова, значит для них O(количество слов * средняя длина слов)
 *
 * Итого O((количество слов * средняя длина слов) + длина шпаргалки)
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
    const text = readString();
    skipLine();
    const patterns = inputLines.slice(2);

    const dp = new Array(text.length);

    const templatesTrie = new Trie();

    patterns.forEach((pattern) => {
        templatesTrie.addWordArray(pattern.split('').reverse());
    });

    for (let i = 0; i < text.length; i++) {
        dp[i] = false;

        const letter = text[i];
        prevIndex = i - 1;

        let currNode = templatesTrie.root[letter];

        while (currNode) {
            const templateFound = currNode && currNode.isTerminal;

            if (templateFound) {
                const textBeforeCurrentTemplateWasCompleted = dp[prevIndex];

                if (textBeforeCurrentTemplateWasCompleted || prevIndex < 0) {
                    dp[i] = true;
                    break;
                }
            }

            let prevLetter = text[prevIndex];
            prevIndex--;
            currNode = currNode[prevLetter];
        }
    }

    if (dp[dp.length - 1]) {
        process.stdout.write('YES\n');
    } else {
        process.stdout.write('NO\n');
    }
}

class Trie {
    constructor() {
        this.root = {};
    }

    addWordArray(word) {
        let currNode = this.root;
        const terminalIndex = word.length - 1;

        word.forEach((letter, index) => {
            if (! currNode[letter]) {
                currNode[letter] = {
                    self: letter,
                };
            }

            currNode[letter].isTerminal = currNode[letter].isTerminal || index === terminalIndex;

            currNode = currNode[letter];
        });

        return currNode;
    }
}

function skipLine() {
    currLine++;
}

function readString() {
    const str = inputLines[currLine];
    currLine++;
    return str;
}
