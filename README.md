# commission-calculator
Commission Calculator is a Node.js application that calculates commission fees for cash-in and cash-out operations. The application supports operations for both natural and legal persons, following the provided rules and configurations.

# Prerequisites
 * Node.js (version 12 or higher)
 * npm (version 6 or higher)

# Installation
Clone the repository:
```console
git clone https://github.com/yourusername/commission-calculator.git
```
Navigate to the project directory:
```console
cd commission-calculator
```
Install the required dependencies:
```console
npm install
```

# Usage
To run the application, execute the following command, replacing input.json with the path to your input JSON file:
```console
node app.js input.json
```
The application will output the calculated commission fees for each operation to stdout.

# Running Tests
To run the tests for this project, execute the following command:
```console
npm test
```
This will run all the tests using Jest and display the test results in the terminal.

# Project Structure
 * src: The main source code of the application
   * commissionCalculator.js: Contains the core functions for calculating commission fees
 * test: The test files for the application
   * commissionCalculator.test.js: Contains the unit tests for the commission calculation functions
 * app.js: The main entry point of the application
