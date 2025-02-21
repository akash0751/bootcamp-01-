
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log("Please provide exactly one number.");
  process.exit(1); 
}

const number = Number(args[0])
if (isNaN(number)) {
  console.log("The provided argument is not a valid number.");
  process.exit(1);
}

if (number % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}