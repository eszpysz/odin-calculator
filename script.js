function add (a, b) {
    let numberA = Number(a);
    let numberB = Number(b);
    return numberA + numberB;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b == 0) {
        return 'Can\'t do that';
    } else {
        return a / b;
    }
}

function operate (str = '') {
    let operationList = str.split(' ');

    let result = 0;

    while(operationList.length !== 1) {
        if (operationList[1] === '+') {
            result = add(operationList[0], operationList[2]);
        } else if (operationList[1] === '-') {
            result = subtract(operationList[0], operationList[2]);
        } else if (operationList[1] === '*') {
            result = multiply(operationList[0], operationList[2]);
        } else if (operationList[1] === '/') {
            result = divide(operationList[0], operationList[2]);
        }

        operationList.splice(0, 3)
        operationList.unshift(result)
    }

    console.log(result)

    if (Number.isInteger(result)) {
        return result;
      } else {
        return result.toFixed(11).toString().replace(/0+$/, '');
      }
}

const maxNumberLength = 11;

const buttons = document.querySelector('.buttons');
const display = document.querySelector('.screen');

let operation = '';
let modifiedOperation = '';

buttons.addEventListener('click', e => {
    let target = e.target;
    let displayValue = display.textContent;

    if (target.className === 'clear') {
        display.textContent = '';
        operation = '';
    }

    if (target.className === 'number') {
        if (display.textContent != '0') {
            if (operation === '') {
                display.textContent = '';
            }
            if (displayValue.length <= maxNumberLength) {
                operation += target.textContent;
                display.textContent += target.textContent;
            }
        }
    }

    if (target.className === 'operator') {
        if (display.textContent !== '' && operation === '') {
            operation += `${display.textContent} ${target.textContent} `
        }
        operation += ` ${target.textContent} `;
        display.textContent = '';
    }

    if (target.className === 'equal') {
        if (display.textContent !== '' && operation === '') {
            let lastResult = display.textContent;
            let operationsList = modifiedOperation.split(' ');

            let lastOperator = operationsList[operationsList.length - 2];
            let lastNumber = operationsList[operationsList.length - 1];

            let operationString = `${lastResult} ${lastOperator} ${lastNumber}`;

            console.log(operationString)

            display.textContent = operate(operationString);
        }
        if (operation[operation.length-1] !== ' ' && operation !== '') {
            display.textContent = operate(operation);
            modifiedOperation = operation;
            operation = '';
        }
    }
});