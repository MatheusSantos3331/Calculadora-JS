const previousOperationText = document.querySelector("#previo-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

 //Adiciona digito no visor da calculadora
  addDigit(digit) {
    console.log(digit);
    // Check if number already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processo de operações de calculo 
  processOperation(operation) {
    // Verifica se esta vazia
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Muda a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    //  Pega o valor anterior e o valor atual
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];//Valor anterior
    let current = +this.currentOperationText.innerText;//valor atual

    switch (operation) {
      case '+':
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '-':
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '*':
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '/':
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case 'DEL':
        this.processDelOperator();
        break;
      case 'CE':
        this.processClearCurrentOperator();
        break;
      case 'C':
        this.processClearOperator();
        break;
      case '=':
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // Muda os valores no visor da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // Junta os numero com o atual valor
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Verifica se o valor é zero e se for apenas adiciona o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      //Adiciona o valor atual
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Muda o operador matematico
  changeOperation(operation) {
    const mathOperations = ['/','*', '-', '+'];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Deleta o digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Limpa a atual operação
  processClearCurrentOperator() {
    this.currentOperationText.innerText = '';
  }

  // Limpa todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = '';
    this.previousOperationText.innerText = '';
  }

  // Resultado
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(' ')[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});