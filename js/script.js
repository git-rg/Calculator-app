// Get all the buttons and the result screen
const resultScreen = document.getElementById('result');
const buttons = document.querySelectorAll('button');
let currentInput = '0'; // Initialize current input as '0'
let previousInput = ''; // For storing the previous input
let operator = ''; // For storing the selected operator

// Function to update the result screen
function updateScreen() {
  resultScreen.textContent = currentInput;
}

// Add event listeners for button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'AC') {
      // Reset everything when 'AC' is clicked
      currentInput = '0';
      previousInput = '';
      operator = '';
    } else if (value === '=') {
      // Perform the calculation when '=' is clicked
      if (operator && previousInput !== '') {
        currentInput = evaluateExpression(previousInput, operator, currentInput);
        previousInput = '';
        operator = '';
      }
    } else if (value === '%') {
      // Modulo operator
      currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (value === 'x²') {
      // Square the current input
      currentInput = (Math.pow(parseFloat(currentInput), 2)).toString();
    } else if (['+', '-', '×', '÷'].includes(value)) {
      // Handle operators
      if (previousInput !== '') {
        currentInput = evaluateExpression(previousInput, operator, currentInput);
      }
      previousInput = currentInput;
      operator = value === '×' ? '*' : value === '÷' ? '/' : value;
      currentInput = '0';
    } else {
      // Handle numbers and decimal point
      if (currentInput === '0' && value !== '.') {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }

    updateScreen();
  });
});

// Function to evaluate the expression
function evaluateExpression(num1, operator, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case '+':
      return (num1 + num2).toString();
    case '-':
      return (num1 - num2).toString();
    case '*':
      return (num1 * num2).toString();
    case '/':
      return num2 !== 0 ? (num1 / num2).toString() : 'Error';
    default:
      return num2.toString();
  }
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if ('0123456789'.includes(key)) {
    // If the key is a number, append it to the current input
    if (currentInput === '0' && key !== '.') {
      currentInput = key;
    } else {
      currentInput += key;
    }
  } else if (key === 'Enter') {
    // Evaluate the expression when Enter is pressed
    if (operator && previousInput !== '') {
      currentInput = evaluateExpression(previousInput, operator, currentInput);
      previousInput = '';
      operator = '';
    }
  } else if (key === 'Backspace') {
    // Delete the last character when Backspace is pressed
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
  } else if (key === '+') {
    operator = key;
    previousInput = currentInput;
    currentInput = '0';
  } else if (key === '-') {
    operator = key;
    previousInput = currentInput;
    currentInput = '0';
  } else if (key === '*') {
    operator = '×';
    previousInput = currentInput;
    currentInput = '0';
  } else if (key === '/') {
    operator = '÷';
    previousInput = currentInput;
    currentInput = '0';
  } else if (key === '%') {
    currentInput = (parseFloat(currentInput) / 100).toString();
  } else if (key === '.') {
    // Handle decimal point
    if (!currentInput.includes('.')) {
      currentInput += '.';
    }
  } else if (key === 'c' || key === 'C') {
    // Clear everything on 'c' or 'C'
    currentInput = '0';
    previousInput = '';
    operator = '';
  }

  updateScreen();
});
