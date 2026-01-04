const MAX_DISPLAY_LENGTH = 13;

const btnContainer = document.querySelector('#buttons');
const calcDisplay = document.querySelector('#display');

let numA = 0;
let numB = null;
let op = null;



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

function clear(numAInitVal = 0){
    numA = numAInitVal;
    numB = null;
    op = null;
    updateDisplay('0');
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

    if(curDisplay !== '0'){
        if(op === null){
            updatedDisplayTxt += inputTxt;
        }
        else{
            if(numB === null){
                updatedDisplayTxt = inputTxt;
            }
            else{
                updatedDisplayTxt += inputTxt;
            }
        }
    }
    else{
        updatedDisplayTxt = inputTxt;
    }

    updateDisplay(updatedDisplayTxt);
    updateNumVars(updatedDisplayTxt);
}

function handleDecimalInput(inputTxt){
    const curDisplay = calcDisplay.textContent;
    if(!curDisplay.includes('.')){
        updateDisplay(curDisplay + inputTxt);
        updateNumVars(curDisplay + inputTxt);
    }
}

function handleOpInput(inputTxt){
    if(op !== inputTxt){
        op = inputTxt;
    }
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