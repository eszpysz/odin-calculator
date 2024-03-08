function add(a, b) {
    numberA = Number(a);
    numberB = Number(b);
    return numberA + numberB;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(str = '') {
    const tokens = str.split(/([+-\/\*])/);

    let result = Number(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = Number(tokens[i + 1]);

        switch (operator) {
        case '+':
            result = add(result, operand);
            break;
        case '-':
            result = subtract(result, operand);
            break;
        case '*':
            result = multiply(result, operand);
            break;
        case '/':
            result = divide(result, operand);
            break;
        default:
            throw new Error("Nieznany operator: " + operator);
        }
    }

    return result;
}

const buttons = document.querySelector('.buttons');
const displayValue = document.querySelector('.screen');
displayValue.textContent = '';

const maxScreenLength = 12;
let operationValue = '';

let equalSwitch = true;

buttons.addEventListener('click', e => {
    let target = e.target;

    if (target.className === 'clear') {
        operationValue = '';
        displayValue.textContent = '';
    }

    if (target.className === 'equal') {
        if (equalSwitch) {
            displayValue.textContent = operate(operationValue);
            operationValue = '';
            equalSwitch = false;
        } else {
            displayValue.textContent = operate(operationValue);
            operationValue = '';
            equalSwitch = true;
        }
    }

    if (target.className === 'operator') {
        if (equalSwitch) {
            operationValue += ` ${target.textContent} `
            displayValue.textContent = '';
        } else {
            operationValue = `${displayValue.textContent} ${target.textContent} `;
            displayValue.textContent = '';
        }
    }

    if (target.className === 'number') {
        if (equalSwitch) {
            if (displayValue.textContent.length < maxScreenLength) {
                operationValue += target.textContent;
                displayValue.textContent += target.textContent;
            }
        } else {
            if (operationValue === '') {
                operationValue = `${target.textContent}`;
                displayValue.textContent = target.textContent;
                equalSwitch = true;
            } else {
                operationValue += `${target.textContent}`;
                displayValue.textContent = target.textContent;
                equalSwitch = true;
            }
        }
    }
});