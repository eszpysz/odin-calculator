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

    if (Number.isInteger(result)) {
        return result;
      } else if (typeof result === 'string') {
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

    switch(target.className) {
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        case 'number':
            number(target);
            break;
        case 'comma':
            comma();
            break;
        case 'operator':
            operator(target);
            break;
        case 'equal':
            equal();
            break;
    }
});

function clear() {
    display.textContent = '';
    operation = '';
}

function backspace() {
    if (display.textContent !== '' && operation !== '') {
        if (operation[operation.length-1] !== ' ') {
            display.textContent = display.textContent.slice(0, -1);
            operation = operation.slice(0, -1);
        }
    }
}

function number(target) {
    if (display.textContent != '0') {
        if (operation === '') {
            display.textContent = '';
        }
        if (display.textContent.length <= maxNumberLength) {
            operation += target.textContent;
            display.textContent += target.textContent;
        }
    }
}

function comma() {
    if (display.textContent !== '') {
        if (!display.textContent.includes('.')) {
            if (operation !== '') {
                if (operation[operation.length-1] !== ' ') {
                    operation += '.';
                    display.textContent += '.';
                }
            }
        }
    }
}

function operator(target) {
    if (display.textContent !== '' && operation === '') {
        operation += `${display.textContent}`
    }
    operation += ` ${target.textContent} `;
    display.textContent = '';
}

function equal() {
    if (display.textContent !== '' && operation === '') {
        let lastResult = display.textContent;
        let operationsList = modifiedOperation.split(' ');

        let lastOperator = operationsList[operationsList.length - 2];
        let lastNumber = operationsList[operationsList.length - 1];

        let operationString = `${lastResult} ${lastOperator} ${lastNumber}`;

        display.textContent = operate(operationString);
    }
    if (operation[operation.length-1] !== ' ' && operation !== '') {
        display.textContent = operate(operation);
        modifiedOperation = operation;
        operation = '';
    }
}

window.addEventListener('keydown', e => {
    let key = e.key;
    
    switch(key) {

        // Keys 0-9
        case '0':
            numberKey('0');
            break;
        case '1':
            numberKey('1');
            break;
        case '2':
            numberKey('2');
            break;
        case '3':
            numberKey('3');
            break;
        case '4':
            numberKey('4');
            break;
        case '5':
            numberKey('5');
            break;
        case '6':
            numberKey('6');
            break;
        case '7':
            numberKey('7');
            break;
        case '8':
            numberKey('8');
            break;
        case '9':
            numberKey('9');
            break;

        // Operators
        case '+':
            operatorKey('+');
            break;
        case '-':
            operatorKey('-');
            break;
        case '*':
            operatorKey('*');
            break;
        case '/':
            operatorKey('/');
            break;

        // Main Keys
        case 'Enter':
            equal();
            break;
        case 'c':
        case 'C':
            clear();
            break;
        case 'Backspace':
            backspace();
            break;
        case ',':
        case '.':
            comma();
            break;
    }
});

function operatorKey(operator) {
    if (display.textContent !== '' && operation === '') {
        operation += `${display.textContent}`
    }
    operation += ` ${operator} `;
    display.textContent = '';
}

function numberKey(number) {
    if (display.textContent != '0') {
        if (operation === '') {
            display.textContent = '';
        }
        if (display.textContent.length <= maxNumberLength) {
            operation += number;
            display.textContent += number;
        }
    }
}