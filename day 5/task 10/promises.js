const fs = require('fs').promises;


const readFile = (filePath) => {
    return fs.readFile(filePath, 'utf8');
};

const processContent = (content) => {
    return content.toUpperCase();
};

const writeFile = (filePath, content) => {
    return fs.writeFile(filePath, content, 'utf8');
};

const inputFile = 'input.txt';
const outputFile = 'output.txt';

readFile(inputFile)
    .then((data) => {
        console.log("✅ File read successfully!");
        return processContent(data);
    })
    .then((processedData) => {
        console.log("✅ Content processed!");
        return writeFile(outputFile, processedData);
    })
    .then(() => {
        console.log(`✅ Process completed! Processed content saved to "${outputFile}"`);
    })
    .catch((err) => {
        console.error("Error:", err.message);
    });
