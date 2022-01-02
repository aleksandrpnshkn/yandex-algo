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
    const segments = inputLines.slice(1)
        .map((segment) => {
            return segment.split(' ')
                .map((point) => Number(point));
        });

    segments.sort((a, b) => a[0] - b[0]);

    const mergedSegments = [];

    let [left, right] = segments[0];

    segments.slice(1).forEach((segment) => {
        const [currLeft, currRight] = segment;

        if (currLeft <= right) {
            right = Math.max(currRight, right);
            return;
        }

        mergedSegments.push([left, right]);
        left = currLeft;
        right = currRight;
    });

    mergedSegments.push([left, right]);

    mergedSegments.forEach((segment) => {
        process.stdout.write(segment.join(' ') + '\n');
    });
}
