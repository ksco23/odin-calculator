let numA = 0;
let numB = 0;
let op = '';

/*console.log(operate(2, 2, '+'));
console.log(operate(4, 2, '-'));
console.log(operate(3, 2, '*'));
console.log(operate(8, 2, '/'));
console.log(operate(2, 2, 'x'));*/



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