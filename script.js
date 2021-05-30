class calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1); // trich xuat phan tu tu 0 den -1 ko bao gom phan tu -1
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.computation = undefined;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deletesButton = document.querySelector("[data-delete]");
const resetButton = document.querySelector("[data-reset]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const Calculator = new calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    Calculator.appendNumber(button.innerText);
    Calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    Calculator.chooseOperation(button.innerText);
    Calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  Calculator.compute();
  Calculator.updateDisplay();
});

deletesButton.addEventListener("click", () => {
  Calculator.delete();
  Calculator.updateDisplay();
});

resetButton.addEventListener("click", () => {
  Calculator.clear();
  Calculator.updateDisplay();
});

function addClass(className) {
  var element = document.getElementsByTagName("body")[0];
  element.classList.add(className);
}

function removeClass(className) {
  var element = document.getElementsByTagName("body")[0];
  element.classList.remove(className);
}

$('input[type=range]').on('input', function () {
  var mode_theme = $(this).val();
  switch(mode_theme) {
    case '1':
      removeClass("theme-2");
      removeClass("theme-3"); 
      break;
    case '2':
      addClass("theme-2");
      removeClass("theme-3");
      break;
    case '3': 
    addClass('theme-3'); 
    removeClass('theme-2'); 
      break; 
    default:
      break; 
  } 
});