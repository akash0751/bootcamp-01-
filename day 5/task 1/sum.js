
const args = process.argv.slice(2);


if (args.length !== 2) {
  console.log("Please provide exactly two numbers.");
  process.exit(1); 
}

const [num1, num2] = args.map(Number);


if (isNaN(num1) || isNaN(num2)) {
  console.log("Both arguments must be valid numbers.");
  process.exit(1);
}


const sum = num1 + num2;
console.log(`The sum of ${num1} and ${num2} is ${sum}.`);