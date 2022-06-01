// ID успешной посылки 68701385

/*
 * -- ПРИНЦИП РАБОТЫ --
 * Составить смежный список дорог, изменив направление у одного из типов дороги.
 * В получившемся графе цикл будет означать что между двумя городами есть пути из разных типов дороги.
 * Циклы искать с помощью DFS с окрашиванием посещенных вершин.
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Цикл может образоваться только при условии что между двумя городами есть путь из двух разных типов дорог.
 *
 * Предположим что между двумя городами есть два пути из одинаковых типов дорог.
 * Эти пути всегда направлены в одну сторону, т.к. в условии задачи сказано, что по дорогам можно ехать только в одну сторону (в столицу).
 * Значит цикла быть не может.
 *
 * Предположим что между двумя городами два пути, и один (или оба) из них состоит из разных типов дорог.
 * Т.к. ребра разных типов дорог направлены в разные стороны (один тип в столицу, а другой тип в стартовый город),
 *  то это означает что либо они оба войдут в одну из вершин на пути, либо оба выйдут, а значит цикла на этом пути быть не может.
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Создание и заполнение смежного списка roads:
 *  Заполнение roads массивами - O(V)
 *  Заполнение данными, распределение всех ребер по вершинам - O(V + E)
 *  Итого на список: O(V + E)
 *
 * DFS:
 *  Перебор всех вершин по смежному списку с доступом за O(1) и перебор всех ребер - O(V + E)
 *
 * Итого на программу: O(V + E)
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * inputLines - список строк, где длина строк зависит от количества вершин - O(V + E)
 * Смежный список roads: ограниченное число ребер распределенно по ограниченному числу вершин - O(V + E)
 * Список colors - O(V)
 * Стек для перебора вершин citiesToVisitStack - в худшем случае O(V)
 *
 * Итого на программу: O(V + E)
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

const COLOR_WHITE = 0;
const COLOR_GRAY = 1;
const COLOR_BLACK = 2;

function solve() {
    const citiesCount = readNumber();

    // смежный список
    const roads = new Array(citiesCount + 1);

    for (let fromCity = 1; fromCity <= citiesCount; fromCity++) {
        roads[fromCity] = [];
    }

    // заполнить смежный список дорог
    for (let fromCity = 1; fromCity < citiesCount; fromCity++) {
        inputLines[fromCity].split('').forEach((roadType, toCityIndex) => {
            const toCity = fromCity + toCityIndex + 1;

            // часть ребер развернуть, тогда по циклу в графе можно будет понять что путь проложен для обоих типов дороги
            if (roadType === 'R') {
                roads[fromCity].push(toCity);
            } else {
                roads[toCity].push(fromCity);
            }
        });
    }

    const colors = new Array(citiesCount + 1);
    colors.fill(COLOR_WHITE);
    colors[0] = undefined;

    const citiesToVisitStack = [];

    // граф слабо связный и из-за изменения направления ребер может получиться так, что из одной вершины его обойти не получится
    for (let startCity = 0; startCity < citiesCount; startCity++) {
        // белая вершина означает новую непосещенную компоненту
        if (colors[startCity] !== COLOR_WHITE) {
            continue;
        }

        citiesToVisitStack.push(startCity);

        // DFS
        while (citiesToVisitStack.length > 0) {
            const city = citiesToVisitStack.pop();

            // серая вершина означает что все исходящие ребра уже обошли и вернулись назад
            if (colors[city] === COLOR_GRAY) {
                colors[city] = COLOR_BLACK;
                continue;
            }

            // пометить вершину чтобы понять что в неё уже зашли и оставить в стеке
            colors[city] = COLOR_GRAY;
            citiesToVisitStack.push(city);

            for (let i = 0; i < roads[city].length; i++) {
                const toCity = roads[city][i];

                // если серая вершина, то значит наткнулись на одну из вершин, которую сейчас обходим, это цикл
                if (colors[toCity] === COLOR_GRAY) {
                    process.stdout.write('NO\n');
                    return;
                }

                // в черной вершине уже все исходящие ребра обошли, там смотреть нечего
                if (colors[toCity] === COLOR_BLACK) {
                    continue;
                }

                citiesToVisitStack.push(toCity);
            }
        }
    }

    process.stdout.write('YES\n');
}

function readNumber() {
    const num = Number(inputLines[curLine]);
    curLine++;
    return num;
}
