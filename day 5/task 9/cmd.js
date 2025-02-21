

const fs = require('fs');
const path = require('path');

const command = process.argv[2]; 
const fileName = process.argv[3]; 

if (!command || !fileName) {
    console.log("Usage:");
    console.log("  my-tool create <filename> - Creates a new file");
    console.log("  my-tool delete <filename> - Deletes the specified file");
    process.exit(1);
}

const filePath = path.resolve(fileName);

if (command === "create") {
    fs.writeFile(filePath, "", (err) => {
        if (err) {
            console.error("Error creating file:", err.message);
        } else {
            console.log(`File created: ${filePath}`);
        }
    });
} else if (command === "delete") {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err.message);
        } else {
            console.log(`File deleted: ${filePath}`);
        }
    });
} else {
    console.log("Invalid command! Use 'create' or 'delete'.");
}
