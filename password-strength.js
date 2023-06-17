function strongPasswordChecker(password) {
  let steps = 0;

  // Check length of the password
  if (password.length < 6) {
    steps += 6 - password.length;
  } else if (password.length > 20) {
    steps += password.length - 20;
  }

  // Check for lowercase, uppercase, and digit
  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;

  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i);

    if (char.match(/[a-z]/)) {
      hasLower = true;
    } else if (char.match(/[A-Z]/)) {
      hasUpper = true;
    } else if (char.match(/[0-9]/)) {
      hasDigit = true;
    }

    if (hasLower && hasUpper && hasDigit) {
      break;
    }
  }

  // Check for repeating characters
  let repeating = 0;

  for (let i = 1; i < password.length; i++) {
    if (password.charAt(i) === password.charAt(i - 1)) {
      repeating += 1;
      if (repeating % 3 === 2) {
        steps += 1;
      }
    } else {
      repeating = 0;
    }
  }

  return steps;
}

module.exports = strongPasswordChecker;