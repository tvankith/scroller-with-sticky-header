const fs = require('fs');

const filePath = './dist/index.js';
const importStatement = "import './style.css';\n";

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const modifiedData = importStatement + data;

  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Import statement added successfully!');
  });
});
