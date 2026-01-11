const MAX_DISPLAY_LENGTH = 13;

const btnContainer = document.querySelector('#buttons');
const calcDisplay = document.querySelector('#display');
const numDisplay = calcDisplay.querySelector('#numbers');
const curEquationDisplay = calcDisplay.querySelector('#curEquation');

let numA = 0;
let numB = null;
let op = null;

let allowBackspace = true;
let numInputShouldClearDisplay = true;
curEquationDisplay.classList.add('opacity0');

btnContainer.addEventListener('click', btnClickEvt);
document.addEventListener('keyup', keyupEvt);

function btnClickEvt(e){
    if(e.target.tagName === 'BUTTON'){
        if(e.target.id === 'clearBtn'){
            clear();
        }
        else if(e.target.id === 'equalBtn'){
            solve();
        }
        else if(e.target.id === 'backspace'){
            backspace();
        }
        else{
            parseInput(e.target.textContent);
        }
    }
}

function keyupEvt(e){
    if(e.key === 'Escape'){
        clear();
    }
    else if(e.key === 'Enter'){
        if(!btnContainer.contains(document.activeElement)){
            solve();
        }
    }
    else if(e.key === '='){
        solve();
    }
    else if(e.key.length === 1 && e.key.search(/[0-9\+\-\*\/\.]/) !== -1){
        parseInput(e.key);
    }
    else if(e.key === 'Backspace'){
        backspace();
    }
}

function solve(){
    if(numB !== null && op !== null){
        const solution = operate(numA, numB, op);
        const roundedSolution = roundSolution(solution);
        updateDisplay(roundedSolution);
        updateCurEquationDisplay(true);
        allowBackspace = false;
        clear(roundedSolution);
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
    if(initValNumA === 0){
        updateDisplay('0');
        hideCurEquationDisplay();
    }
    numInputShouldClearDisplay = true;
}

function parseInput(inputTxt){
    const curDisplay = numDisplay.textContent;
    if(curDisplay.length < MAX_DISPLAY_LENGTH){
        if(inputTxt.search(/[0-9]/) !== -1){
            handleNumericalInput(inputTxt);
        }
        else if(inputTxt === '.'){
            handleDecimalInput(inputTxt);
        }
        else if(inputTxt.search(/[\+\-\*\/]/) !== -1){
            handleOpInput(inputTxt);
        }
    }
}

function handleNumericalInput(inputTxt){
    const curDisplay = numDisplay.textContent;
    let updatedDisplayTxt = curDisplay;
    allowBackspace = true;

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
        if(numB === null || numB === 0 || numInputShouldClearDisplay){
            updatedDisplayTxt = inputTxt;
            numInputShouldClearDisplay = false;
        }
        else{
            updatedDisplayTxt += inputTxt;
        }
    }

    updateNumVars(updatedDisplayTxt);
    updateDisplay(updatedDisplayTxt);
    updateCurEquationDisplay();
}

function handleDecimalInput(inputTxt){
    const curDisplay = numDisplay.textContent;
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

    updateNumVars(updatedDisplayTxt);
    updateDisplay(updatedDisplayTxt);
    updateCurEquationDisplay();
}

function handleOpInput(inputTxt){
    solve();
    op = inputTxt;
    updateCurEquationDisplay();
}

function backspace(){
    if(allowBackspace){
        if(op === null){
            numA = deleteLastDigit(numA);
            numInputShouldClearDisplay = numA === 0;
            updateDisplay('' + numA);
        }
        else{
            if(numB !== null){
                numB = deleteLastDigit(numB);
                numInputShouldClearDisplay = numB === 0;
                updateDisplay('' + numB);
                updateCurEquationDisplay();
            }
        }
    }
}

function deleteLastDigit(num){
    const numString = '' + num;
    let newNum = 0;

    if(numString.length > 1){
        newNum = +(numString.slice(0, -1));
    }

    return newNum;
}

function updateDisplay(displayString){
    numDisplay.textContent = displayString;
}

function updateCurEquationDisplay(isSolved = false){
    hideCurEquationDisplay();
    let curEquation = '0';
    
    if(op !== null){
        curEquation = `${numA} ${op}`;
        showCurEquationDisplay();
    }
    if(numB !== null){
        curEquation += ` ${numB}`;
    }
    if(isSolved){
        curEquation += ' =';
    }

    curEquationDisplay.textContent = curEquation;
}

function updateNumVars(numString){
    if(op === null){
        numA = +numString;
    }
    else{
        numB = +numString;
    }
}

function hideCurEquationDisplay(){
    curEquationDisplay.classList.add('opacity0');
    curEquationDisplay.classList.remove('opacity1');
}

function showCurEquationDisplay(){
    curEquationDisplay.classList.add('opacity1');
    curEquationDisplay.classList.remove('opacity0');
}