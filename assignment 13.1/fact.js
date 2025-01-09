function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  let fact = 1;
  for (let i = 2; i <= n; i++) {
    fact *= i;
  }
  return fact;
}

const time = (seconds, callback) => setTimeout(callback, seconds * 1000);

function asyncFactorial(n, callback) {
  time(n, function() {
    const fact = factorial(n);
    callback(fact);
  });
}

function handleFactorialRequest(n) {
  console.log(`Calculating factorial of ${n}... Please wait.`);
  asyncFactorial(n, function(fact) {
    console.log(`Factorial of ${n} is ${fact}`);
  });
}

handleFactorialRequest(5);

