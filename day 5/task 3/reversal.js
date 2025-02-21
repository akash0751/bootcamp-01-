
if (process.argv.length !== 3) {
    console.log("Usage: node reverse_string.js <string>");
    process.exit(1);
}

const inputString = process.argv[2];

const reversedString = inputString.split("").reverse().join("");

console.log("Reversed String:", reversedString);
