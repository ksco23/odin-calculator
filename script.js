const MAX_DISPLAY_LENGTH = 13;

const btnContainer = document.querySelector('#buttons');
const calcDisplay = document.querySelector('#display');

let numA = 0;
let numB = null;
let op = null;

let numInputShouldClearDisplay = true;

btnContainer.addEventListener('click', btnClickEvt);

function btnClickEvt(e){
    if(e.target.tagName === 'BUTTON'){
        if(e.target.id === 'clearBtn'){
            clear();
        }
        else if(e.target.id === 'equalBtn'){
            solve();
        }
        else{
            parseInput(e.target.textContent);
        }
    }
}

function solve(){
    if(numB !== null && op !== null){
        const solution = operate(numA, numB, op);
        clear(roundSolution(solution));
    }
}

function operate(a, b, op){
    if(op === '+'){
        return add(a, b);
    }
    else if(op === '-'){
        return subtract(a, b);
    }
    else if(op === '*'){
        return multiply(a, b);
    }
    else if(op === '/'){
        return divide(a, b);
    }
    else{
        console.error('In operate, op is not valid.');
        return false;
    }
}

function add(a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    return a / b;
}

function roundSolution(num){
    let digits = MAX_DISPLAY_LENGTH;
    if(num < 0){
        //Remove a digit to account for the negative sign
        digits--;
    }
    if(!Number.isInteger(num)){
        //Remove a digit to account for the decimal
        digits--;
    }
    if(num > -1 && num < 1){
        //Remove a digit to account for the leading 0
        digits--;
    }

    return (+num.toPrecision(digits));
};

function clear(initValNumA = 0){
    numA = initValNumA;
    numB = null;
    op = null;
    updateDisplay('' + initValNumA);
    numInputShouldClearDisplay = true;
}

function parseInput(inputTxt){
    const curDisplay = calcDisplay.textContent;
    if(curDisplay.length < MAX_DISPLAY_LENGTH){
        if(inputTxt.search(/[0-9]/) !== -1){
            handleNumericalInput(inputTxt);
        }
        else if(inputTxt === '.'){
            handleDecimalInput(inputTxt);
        }
        else if(inputTxt.search(/[[\+\-\*\/]]/)){
            handleOpInput(inputTxt);
        }
    }
}

function handleNumericalInput(inputTxt){
    const curDisplay = calcDisplay.textContent;
    let updatedDisplayTxt = curDisplay;

    if(op === null){
        if(numInputShouldClearDisplay){
            updatedDisplayTxt = inputTxt;
            numInputShouldClearDisplay = false;
        }
        else{
            updatedDisplayTxt += inputTxt;
        }
    }
    else{
        if(numB === null){
            updatedDisplayTxt = inputTxt;
        }
        else{
            updatedDisplayTxt += inputTxt;
        }
    }

    updateDisplay(updatedDisplayTxt);
    updateNumVars(updatedDisplayTxt);
}

function handleDecimalInput(inputTxt){
    const curDisplay = calcDisplay.textContent;
    let updatedDisplayTxt = curDisplay;

    if(op === null){
        if(numInputShouldClearDisplay){
            updatedDisplayTxt = '0.';
            numInputShouldClearDisplay = false;
        }
        else{
            if(!curDisplay.includes('.')){
                updatedDisplayTxt += inputTxt;
            }   
        }
    }
    else{
        if(numB === null){
            updatedDisplayTxt = '0.';
        }
        else{
            if(!curDisplay.includes('.')){
                updatedDisplayTxt += inputTxt;
            }
        }
    }
    updateDisplay(updatedDisplayTxt);
    updateNumVars(updatedDisplayTxt);
}

function handleOpInput(inputTxt){
    solve();
    op = inputTxt;
}

function updateDisplay(displayString){
    calcDisplay.textContent = displayString;
}

function updateNumVars(numString){
    if(op === null){
        numA = +numString;
    }
    else{
        numB = +numString;
    }
}