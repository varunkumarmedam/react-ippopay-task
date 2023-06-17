const partitionArray = require('./minimum-absolute-difference');

// Test cases runner function
function runTests() {
  let testCases = [
    {
      nums: [3, 9, 7, 3],
      expected: 2,
    },
    {
      nums: [-36, 36],
      expected: 72,
    },
    {
      nums: [2, -1, 0, 4, -2, -9],
      expected: 0,
    },
  ];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const result = partitionArray(testCase.nums);
    console.log(`Test Case ${i + 1}:`);
    console.log("Input:", testCase.nums);
    console.log("Expected Output:", testCase.expected);
    console.log("Actual Output:", result);
    console.log("--------------------------------");
  }
}

// Run the tests
runTests();
