let displayValue = '';

function addToDisplay(value) {
    displayValue += value;
    document.getElementById('val-input').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('val-input').value = displayValue;
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    document.getElementById('val-input').value = displayValue;
}

function calculate() {
    try {
        let result;
        for (let i = 0; i < displayValue.length; i++) {
            if (displayValue.charAt(i) == 'x') {
                displayValue = displayValue.replace('x', '*');
            } else if (displayValue.charAt(i) == '÷') {
                displayValue = displayValue.replace('÷', '/');
            }
        }
        if (displayValue.indexOf('%') === -1) {
            result = eval(displayValue);
            document.getElementById('val-input').value = result;
        } else {
            displayValue = evaluateExpression(displayValue);
            result = eval(displayValue);
            document.getElementById('val-input').value = result;
        }
        displayValue = result;
    } catch (error) {
        document.getElementById('val-input').value = 'Error';
        displayValue = '';
d    }
}

function evaluateExpression(displayValue) {
    let percentageRegex = /(\d+(\.\d+)?)%/g;
    displayValue = displayValue.replace(percentageRegex, "($1 / 100)");
    return displayValue;
}
