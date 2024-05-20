document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                operator = '';
                operand1 = '';
                operand2 = '';
                display.textContent = '0';
            } else if (value === '=') {
                if (operand1 && operator && currentInput) {
                    operand2 = currentInput;
                    display.textContent = evaluate(operand1, operator, operand2);
                    currentInput = '';
                    operator = '';
                    operand1 = '';
                    operand2 = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput && !operand1) {
                    operand1 = currentInput;
                    operator = value;
                    currentInput = '';
                } else if (operand1 && operator && currentInput) {
                    operand2 = currentInput;
                    operand1 = evaluate(operand1, operator, operand2);
                    operator = value;
                    currentInput = '';
                    display.textContent = operand1;
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    function evaluate(operand1, operator, operand2) {
        operand1 = parseFloat(operand1);
        operand2 = parseFloat(operand2);
        switch (operator) {
            case '+': return operand1 + operand2;
            case '-': return operand1 - operand2;
            case '*': return operand1 * operand2;
            case '/': return operand1 / operand2;
            default: return '';
        }
    }
});