const fs = require('fs');
const { commissionCalculator } = require('./commissionCalculator');

const main = (inputFilePath) => {
  const inputData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));
  inputData.forEach((commission) => {
    console.log(commissionCalculator(commission).toFixed(2));
  });
};

if (process.argv.length !== 3) {
  console.error('Usage: node app.js <input_file_path>');
  process.exit(1);
}

const inputFilePath = process.argv[2];
main(inputFilePath);
