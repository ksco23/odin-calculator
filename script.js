const MAX_DISPLAY_LENGTH = 13;

const btnContainer = document.querySelector('#buttons');
const calcDisplay = document.querySelector('#display');

let numA = 0;
let numB = 0;
let op = '';



btnContainer.addEventListener('click', btnClickEvt);

function btnClickEvt(e){
    if(e.target.tagName === 'BUTTON'){
        if(e.target.id === 'clearBtn'){
            clear();
        }
        else{
            validateInput(e.target.textContent);
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

function clear(){
    numA = 0;
    numB = 0;
    op = '';
    updateDisplay('0');
}

function validateInput(inputTxt){
    //get current display
    //IF the input is a number or decimal
        //IF input is 0 only don't accpet it if current display is 0
        //IF input is a decimal don't accpt it if current display already contains a decimal
        
    const curDisplay = calcDisplay.textContent;

    if(curDisplay.length < MAX_DISPLAY_LENGTH){
        if(inputTxt.search(/[1-9]/) !== -1){
            if(curDisplay === '0'){
                updateDisplay(inputTxt);
            }
            else{
                updateDisplay(curDisplay + inputTxt);
            }
        }
        else if(inputTxt === '0'){
            if(curDisplay !== '0'){
                updateDisplay(curDisplay + inputTxt);
            }
        }
        else if(inputTxt === '.'){
            if(!curDisplay.includes('.')){
                updateDisplay(curDisplay + inputTxt);
            }
        }
    }
}

function updateDisplay(displayString){
    calcDisplay.textContent = displayString;
}