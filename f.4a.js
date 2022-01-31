/*
 * ID успешной посылки: 64638324
 *
 *
 * -- ПРИНЦИП РАБОТЫ --
 * Индекс состоит из двух частей:
 *      1. Хэш-таблица wordDocs для понимания в каких документах всречается слово.
 *      2. Массив wordsCountInDocs для хранения количества слов в документах.
 *
 * При запросе в хэш-таблице docsResults подсчитывается релевантность для всех релевантных документов.
 * После этого результаты запроса сортируются и выводятся в нужном количестве.
 *
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Общая для всех запросов информация (релевантные для слова документы и количество вхождений слов в документах)
 *  подсчитывается на этапе формирования индексов.
 * Для подсчета релевантности запроса необходимо:
 *  - Учесть дубли ключевых слов в запросе. Это решается использованием структуры Set.
 *  - Быстро получить документы, содержащие ключевое слово.
 *      Это можно сделать за O(1) в wordDocs по ключевому слову.
 *  - Быстро получить количество вхождений ключевого слова в документ.
 *      Это делается за O(1) в wordsCountInDocs по индексу документа и ключевому слову.
 * Это позволяет уменьшить количество вычислений на этапе запроса и уложиться в приемлемое время.
 *
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Обозначения: d  - количество документов
 *              dl - длина документа
 *              k  - количество ключевых слов в запросе
 *              q  - количество запросов
 *
 * Индексация зависит количества документов и слов в нем.
 * На одно слово приходится некоторое количество операций, т.е. O(1).
 * Количество слов в документе хоть и ограниченно, но не константно.
 * Поэтому сложность индексации - O(d * dl).
 *
 * При запросе происходит подсчет релевантности документов и сортировка результатов.
 * При подсчете релевантности документов сложность зависит от ключевых слов и от популярности ключевого слова в документах.
 * В худшем случае все ключевые слова могут встречаться во всех документах, поэтому сложность O(k * d).
 * Сложность сортировки зависит от количества релевантных документов.
 * Т.к. релевантными могут быть все документы, то сложность будет O(d log d).
 * Итого, в худшем случае сложность одного запроса O(d * (k + log d)).
 *
 * Итоговая сложность всех запросов O(q * d * (k + log d)).
 *
 * Итоговая сложность программы: O(d * dl + q * d * (k + log d))
 *
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * Обозначения те же.
 *
 * В индексе две структуры: хэш-таблица wordsDocs и массив wordsCountInDocsэ
 *
 * Количество ключей wordsDocs зависит от количества слов (которые зависят от доков).
 * И размер релевантных документов в значении тоже от количества документов.
 * Два крайних случая:
 *      1. Слова в текстах одинаковые. Тогда количество слов зависит от длины документа.
 *          Т.е. память O(d * dl)
 *      2. Во всех текстах слова уникальные. В wordsDocs будет множество слов, у всех один релевантный док.
 *          Т.е. память O(d)
 * Итого O(d * dl).
 *
 * В wordsCountInDocs тоже самое, поэтому O(d * dl).
 *
 * В запросе основная нагрузка на память идет от docsResults.
 * В худшем случае ключевое слово встретится во всех доках, поэтому O(d)
 *
 * Итоговая сложность программы: O(d * dl)
 */

const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

let inputLines = [];

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

function solve() {
    const RESULTS_COUNT = 5;

    const docsCount = Number(inputLines[0]);
    const docs = inputLines.slice(1, 1 + docsCount);
    const queriesCount = Number(inputLines[1 + docsCount]);
    const queries = inputLines.slice(1 + docsCount + 1, 1 + docsCount + 1 + queriesCount);

    const wordsDocs = {};
    const wordsCountInDocs = new Array(docsCount);

    docs.forEach((doc, docIndex) => {
        wordsCountInDocs[docIndex] = {};

        doc.split(' ').forEach((word) => {
            if (wordsDocs[word] === undefined) {
                wordsDocs[word] = new Set();
            }

            wordsDocs[word].add(docIndex);

            if (wordsCountInDocs[docIndex][word] === undefined) {
                wordsCountInDocs[docIndex][word] = 0;
            }

            wordsCountInDocs[docIndex][word]++;
        });
    });

    queries.forEach((query) => {
        let docsResults = {};

        const keywords = new Set(query.split(' '));

        keywords.forEach((keyword) => {
            if (wordsDocs[keyword] === undefined) {
                return;
            }

            wordsDocs[keyword].forEach((docIndex) => {
                if (docsResults[docIndex] === undefined) {
                    docsResults[docIndex] = 0;
                }

                docsResults[docIndex] += wordsCountInDocs[docIndex][keyword];
            });
        });

        let topResults = Object.entries(docsResults);
        topResults.sort((a, b) => {
            if (a[1] === b[1]) {
                return Number(a[0]) - Number(b[0]);
            }

            return b[1] - a[1];
        });
        topResults = topResults.slice(0, RESULTS_COUNT).map((docResult) => Number(docResult[0]) + 1).join(' ');

        process.stdout.write(topResults + '\n');
    });
}
