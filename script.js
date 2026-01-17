const MAX_DISPLAY_LENGTH = 13;

const btnContainer = document.querySelector('#buttons');
const calcDisplay = document.querySelector('#display');
const numDisplay = calcDisplay.querySelector('#numbers');
const curEquationDisplay = calcDisplay.querySelector('#curEquation');

const calcData = {
    a: {
        num: null,
        str: '0',
        active: true
    },
    b: {
        num: null,
        str: '',
        active: false
    },
    op: null,
    solutionShowing: false
};

updateDisplay(calcData.a.str);

let allowBackspace = true;
curEquationDisplay.classList.add('opacity0');

btnContainer.addEventListener('click', btnClickEvt);
document.addEventListener('keyup', keyupEvt);

function btnClickEvt(e){
    if(e.target.tagName === 'BUTTON'){
        if(e.target.id === 'clearBtn'){
            handleClearInput();
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
        handleClearInput();
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
    if(calcData.b.num === null && (calcData.b.active && calcData.b.str !== '')){
        calcData.b.num = +calcData.b.str;
    }

    if(calcData.a.num !== null && calcData.b.num !== null && calcData.op !== null){
        const solution = operate(calcData.a.num, calcData.b.num, calcData.op);
        const roundedSolution = '' + roundSolution(solution);
        updateCurEquationDisplay(true);
        updateDisplay(roundedSolution);

        resetCalcData(roundedSolution, true);
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

function resetCalcData(numStr, solutionShowing){
    calcData.a.num = solutionShowing ? +numStr : null;
    calcData.a.str = numStr;
    calcData.a.active = !solutionShowing;

    calcData.b.num = null;
    calcData.b.str = '';
    calcData.b.active = solutionShowing;

    allowBackspace = !solutionShowing;
    calcData.solutionShowing = solutionShowing;
    calcData.op = null;
}

function parseInput(inputTxt){
    const curDisplay = numDisplay.textContent;
    if(curDisplay.length < MAX_DISPLAY_LENGTH){
        if(inputTxt.search(/[0-9]/) !== -1){
            manageNonOpInputSolutionIsShowing();
            handleNumericalInput(inputTxt);
        }
        else if(inputTxt === '.'){
            manageNonOpInputSolutionIsShowing();
            handleDecimalInput(inputTxt);
        }
        else if(inputTxt.search(/[\+\-\*\/]/) !== -1){
            handleOpInput(inputTxt);
        }
    }
}

function manageNonOpInputSolutionIsShowing(){
    if(calcData.solutionShowing && calcData.op === null){
        resetCalcData('0', false);
    }
}

function handleClearInput(){
    resetCalcData('0', false);
    updateCurEquationDisplay();
    updateDisplay(calcData.a.str);
}

function handleNumericalInput(inputTxt){
    const entryObj = calcData.a.active ? calcData.a : calcData.b;
    
    if(entryObj.str === '0'){
        entryObj.str = inputTxt;
    }
    else{
        entryObj.str += inputTxt;
        allowBackspace = true;
    }

    updateDisplay(entryObj.str);
    updateCurEquationDisplay();
}

function handleDecimalInput(inputTxt){
    const entryObj = calcData.a.active ? calcData.a : calcData.b;

    if(!entryObj.str.includes('.')){
        if(entryObj.str.length === 0){
            entryObj.str = '0';
        }
        entryObj.str += inputTxt;
        updateDisplay(entryObj.str);
        updateCurEquationDisplay();
        allowBackspace = true;
    }
}

function handleOpInput(inputTxt){
    calcData.solutionShowing = false;
    if(calcData.a.active){
        calcData.a.active = false;
        calcData.b.active = true;
        calcData.a.num = +calcData.a.str;
    }
    else{
        if(calcData.b.num === null && calcData.b.str === ''){
            calcData.b.active = true;
        }
        else{
            calcData.b.num = +calcData.b.str;
            solve();
        }
    }

    allowBackspace = false;
    calcData.op = inputTxt;
    updateCurEquationDisplay();
}

function backspace(){
    if(allowBackspace){
        const entryObj = calcData.a.active ? calcData.a : calcData.b;
        entryObj.str = deleteLastChar(entryObj.str);
        updateCurEquationDisplay();
        updateDisplay(entryObj.str);
    }
}

function deleteLastChar(str){
    if(str.length > 1){
        return str.slice(0, -1);
    }
    return '0';
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
    //hideCurEquationDisplay();
    const op = calcData.op !== null ? calcData.op : '';
    let curEquation = `${calcData.a.str} ${op} ${calcData.b.str}`;

    if(isSolved){
        curEquation += ' =';
    }

    curEquationDisplay.textContent = curEquation;
    showCurEquationDisplay();
}

function hideCurEquationDisplay(){
    curEquationDisplay.classList.add('opacity0');
    curEquationDisplay.classList.remove('opacity1');
}

function showCurEquationDisplay(){
    curEquationDisplay.classList.add('opacity1');
    curEquationDisplay.classList.remove('opacity0');
}