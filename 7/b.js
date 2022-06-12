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
    const lessonsCount = readNumber();
    const lessons = readLessons();

    lessons.sort((l1, l2) => {
        // отсортировать по началу чтобы можно было втиснуть дополнительно "нулевой" урок
        if (l1.endsAt === l2.endsAt) {
            return l1.startsAt - l2.startsAt;
        }

        return l1.endsAt - l2.endsAt;
    });

    let currLesson = lessons.shift();
    const schedule = [currLesson];

    lessons.forEach((nextLesson) => {
        if (nextLesson.startsAt >= currLesson.endsAt) {
            currLesson = nextLesson;
            schedule.push(nextLesson);
        }
    });

    process.stdout.write(String(schedule.length) + '\n');

    const hours = schedule.map((lesson) => lesson.startsAt + ' ' + lesson.endsAt).join('\n');

    process.stdout.write(hours + '\n');
}

function readNumber() {
    const n = Number(inputLines[currLine]);
    currLine++;
    return n;
}

function readLessons() {
    return inputLines.slice(1)
        .map((hours) => {
            const [startsAt, endsAt] = hours.split(' ').map(Number);

            return {
                startsAt,
                endsAt,
            }
        });
}
