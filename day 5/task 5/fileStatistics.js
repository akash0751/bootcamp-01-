const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
    console.log("Usage: node fileStats.js <file-path>");
    process.exit(1);
}

const filePath = path.resolve(process.argv[2]);

fs.stat(filePath, (err, stats) => {
    if (err) {
        console.error("Error reading file stats:", err.message);
        process.exit(1);
    }

    console.log(`File: ${filePath}`);
    console.log(`Size: ${stats.size} bytes`);
    console.log(`Created: ${stats.birthtime}`);
    console.log(`Last Modified: ${stats.mtime}`);
});
