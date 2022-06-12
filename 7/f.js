const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

reader.on('line', (line) => {
    const [stepsCount, maxFootstep] = line.split(' ').map(Number);

    const MOD = 10**9 + 7;

    const stepToNumberOfWays = new Array(stepsCount);
    stepToNumberOfWays.fill(0);
    stepToNumberOfWays[0] = 1;

    for (let step = 1; step < stepsCount; step++) {
        for (let footstep = 1; footstep <= maxFootstep; footstep++) {
            if (stepToNumberOfWays[step - footstep] === undefined) {
                break;
            }

            stepToNumberOfWays[step] = (stepToNumberOfWays[step] + stepToNumberOfWays[step - footstep]) % MOD;
        }
    }

    process.stdout.write(String(stepToNumberOfWays.pop()) + '\n');
});
