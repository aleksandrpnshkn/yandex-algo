const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin,
});

let number = null;

_reader.on('line', (line) => {
    number = Number(line);
});

process.stdin.on('end', solve);

function solve() {
    const primeFactors = [];
    const possibleFactors = getPrimes(Math.floor(Math.sqrt(number)));

    possibleFactors.forEach(function (prime) {
        while (number % prime === 0) {
            primeFactors.push(prime);
            number /= prime;
        }
    });

    if (number > 1) {
        primeFactors.push(number);
    }

    process.stdout.write(primeFactors.join(' '));
}

function getPrimes(maxNumber) {
    const numbers = new Array(maxNumber + 1);
    numbers.fill(true);
    const primes = [];

    for (let n = 2; n <= numbers.length; n++) {
        if (numbers[n]) {
            primes.push(n); 
        }

        primes.forEach(function (prime) {
            const np = prime * n;

            if (np < numbers.length) {
                numbers[np] = false;
            }
        });
    }
    
    return primes;
}