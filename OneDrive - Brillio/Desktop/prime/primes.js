function isPrime(n) {
    if (n < 2) return false;

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }

    return true;
}

function findPrimesSync(min, max) {
    let primes = [];
    for (let i = min; i <= max; i++) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}

function findPrimes(min, max, cb) {
    let primes = [];
    let totalNumbers = max - min + 1;
    let processedCount = 0;

    // Find primes asynchronously and track progress
    for (let i = min; i <= max; i++) {
        if (isPrime(i)) primes.push(i);
        processedCount++;

        // Periodically call the callback to update progress
        if (processedCount % Math.max(1, Math.floor(totalNumbers / 100)) === 0) {
            let progress = Math.round((processedCount / totalNumbers) * 100);
            cb(primes, progress);
        }
    }

    // Final call to update with 100% progress
    cb(primes, 100);
}

try {
    module.exports = {
        isPrime,
        findPrimesSync,
        findPrimes,
    };
} catch (e) {
    // Window application, no harm done
}
