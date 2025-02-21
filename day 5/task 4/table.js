
if (process.argv.length !== 3) {
    console.log("Usage: node multiplication_table.js <number>");
    process.exit(1);
}


const number = parseInt(process.argv[2], 10);


if (isNaN(number)) {
    console.log("Please provide a valid number.");
    process.exit(1);
}
console.log(`Multiplication Table of ${number}:`);

for (let i = 1; i <= 10; i++) {
    console.log(`${number} x ${i} = ${number * i}`);
}
