function add(a, b) {
    numberA = Number(a);
    numberB = Number(b);
    return numberA + numberB;
}

function subtract(a, b) {
    numberA = Number(a);
    numberB = Number(b);
    return numberA - numberB;
}

function multiply(a, b) {
    numberA = Number(a);
    numberB = Number(b);
    return numberA * numberB;
}

function divide(a, b) {
    numberA = Number(a);
    numberB = Number(b);
    if (numberB == 0) {
        return "Can't do that";
    }
    return numberA / numberB;
}

function operate(str = '') {
    const tokens = str.split(/([+\-*/])/);

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
            throw new Error("Unknown operator: " + operator);
        }
    }

    result = result.toFixed(11);

    result = result.replace(/0+$/, "");

    return Number(result);
}


const buttons = document.querySelector('.buttons');
const displayValue = document.querySelector('.screen');
displayValue.textContent = '';

const commaButton = document.querySelector('.comma');
commaButton.disabled = false;

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
        commaButton.disabled = displayValue.textContent.includes('.');

    }

    if (target.className === 'comma') {
        if (displayValue.textContent.length < maxScreenLength) {
            if (displayValue.textContent !== '' && operationValue[operationValue.length-1] !== ' ') {
                operationValue += target.textContent;
                displayValue.textContent += target.textContent;
                commaButton.disabled = true;
            }
        }
    }
});