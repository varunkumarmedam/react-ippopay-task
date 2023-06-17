const strongPasswordChecker = require('./password-strength');

// Test cases runner function
function runTests() {
  let testCases = [
    {
      password: "a",
      expected: 5,
    },
    {
      password: "aA1",
      expected: 3,
    },
    {
      password: "1337C0d3",
      expected: 0,
    },
    
  ];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const result = strongPasswordChecker(testCase.password);
    console.log(`Test Case ${i + 1}:`);
    console.log("Input:", testCase.password);
    console.log("Expected Output:", testCase.expected);
    console.log("Actual Output:", result);
    console.log("--------------------------------");
  }
}

// Run the tests
runTests();
