const fs = require('fs');
const path = require('path');

const traverseDirectory = (dirPath) => {
    try {
        const items = fs.readdirSync(dirPath);

        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                console.log(`Directory: ${fullPath}`);
                traverseDirectory(fullPath); 
            } else {
                console.log(`File: ${fullPath}`);
            }
        }
    } catch (err) {
        console.error("Error reading directory:", err.message);
    }
};


const directoryPath = process.argv[2];

if (!directoryPath) {
    console.log("Usage: node traverse.js <directory-path>");
    process.exit(1);
}

console.log(`Traversing directory: ${directoryPath}`);
traverseDirectory(directoryPath);
