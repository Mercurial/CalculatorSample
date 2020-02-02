// Elements
var numberButtons;
var calcDisplay;
var btnClear;
var btnEquals;
var btnBack;
var operatorButtons;
// =================================================

// Initailizations
var currentValue = null;
var currentOperator;
var result = 0;
var tokens = [];
var hasEquals = false;
// =================================================

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        queryAllElements();
        attachEventHandlers();
        clearDisplay();
    }
};

function queryAllElements() {
    numberButtons = document.querySelectorAll("#calculator-numbers button");
    operatorButtons = document.querySelectorAll("#operators button");
    calcDisplay = document.querySelector("#calculator-display input");
    btnClear = document.querySelector("#btnClear");
    btnEquals = document.querySelector("#btnEquals");
    btnBack = document.querySelector("#btnBack");
}

function attachEventHandlers() {
    for (var x = 0; x < numberButtons.length; x++) {
        numberButtons[x].onclick = onNumberButtonClicked;
    }

    for (var x = 0; x < operatorButtons.length; x++) {
        operatorButtons[x].onclick = onOperatorButtonClicked;
    }

    btnClear.onclick = clearDisplay;
    btnEquals.onclick = onBtnEqualsClicked;
    btnBack.onclick
}

function onNumberButtonClicked(e) {
    var currentDigit = parseInt(e.target.innerText);

    if (currentValue == null) {
        currentValue = currentDigit;
    } else {
        currentValue = currentValue * Math.pow(10, 1);
        currentValue += currentDigit; 
    }
    refreshDisplay(currentValue);
}

function onOperatorButtonClicked(e) {
    if (currentValue == 0) {
        currentOperator = e.target.innerText;
        tokens[tokens.length - 1] = currentOperator;
        return;
    }

    if (!hasEquals)
        tokens.push(currentValue);

    currentValue = 0;
    currentOperator = e.target.innerText;
    tokens.push(currentOperator);
    hasEquals = true;
    compute();
}

function onBtnEqualsClicked() {
    if (typeof tokens[tokens.length - 1] == "string") {
        hasEquals = true;
        tokens.push(currentValue);
        compute();
    }
}

function onBtnBackClicked() {
    tokens.pop();
    compute();
}

function countDigits(n) {
    return Math.floor(Math.log10(Math.abs(n))) + 1;
}

function clearDisplay() {
    hasEquals = false;
    currentValue = 0;
    tokens = [];
    refreshDisplay(currentValue);
}

function compute() {
    var c = 0;
    var p = tokens[0];
    // 1 + 2 +
    for (var x = 0; x < tokens.length; x++) {
        if (typeof tokens[x] == "string" && x != tokens.length - 1) {
            c = tokens[x + 1];
            switch (tokens[x]) {
                case "+":
                    p = p + c;
                    break;
                case "-":
                    p = p - c;
                    break;
                case "*":
                    p = p * c;
                    break;
                case "/":
                    p = p / c;
                    break;
            }
            console.log("operation", p);
        }
    }
    result = p;
    refreshDisplay(result);
}

function refreshDisplay(n) {
    calcDisplay.value = n;
}