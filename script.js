/*to do 3/25 
1) if decimals repeat >3 times, round up to first decimal number  (goal: stop repeating decimals that extend for too long)
2) create function for percentageButton (toPercentage)  (Done)
3) returns "undefined" on negative secondNum (fixed)
4) doesn't always work with negative numbers (fixed)
5) need to round up or down numbers to avoid having a hundred zeros on certain answers (see #1)
    Ex: 8.96 / 5 = 1.7920000000000003 (fixed)
6) changing operator midway through calc doesn't work (fixed)
7) 9 / 8 = and then .3 = yields 3.75 instead of .3 [If display.innerText == result & a number is selected, no operator is chosen and equals button is pressed, display updates to selected number] (fixed)
8) you can input numbers longer than the dialog box extends (it extends past the display window) [Solution: Limit input to 19 characters] (fixed)
9) If input is max chars (19) and I click to "+/-" it rounds up the value  
10) weird results with percentage button
11) sometimes operate function is ran without an operator, leading to result = undefined. Occurs with periods / not specifying operator
12) if result is in display, and new number is pressed, it adds it to the display result instead of a new number (for one num) (fixed)
13) currently 3+3 = undefined. Check back to previous commits to find working version. (fixed 4/18)
14) [4/21] If quotient contains more zeros than Math.round allows, result is zero. (Possible fix 4/21: See division function for further improvements)
*/

const display = document.getElementById('display');
const operators = document.querySelectorAll("#plusMinus, #percentage, #addition, #subtraction, #multiplication, #division, #equals");
const plusMinusButton = document.querySelector("#plusMinus"); 
const percentageButton = document.querySelector("#percentage");


let firstNum = '';
let secondNum = '';
let operator = '';
let result = operate(operator);

//limit characters in display to 18
let maxChars = 18;
function limitCharInDisplay(e) {
    if (firstNum.length > maxChars) {
        display.innerText = display.innerText.substring(0, maxChars);
        firstNum = display.innerText;
    } else if (secondNum > maxChars) {
        display.innerText = display.innerText.substring(0, maxChars);
        secondNum = display.innerText;
    } else if (result > maxChars) {
        display.innerText = display.innerText.substring(0, maxChars);
        result = display.innerText;
    }
}

//add function
const add = function add (firstNum, secondNum) {
    return Math.round((parseFloat(firstNum) + parseFloat(secondNum)) * 1000) / 1000;
};
console.log(add(3,3));

//subtract 
const subtract = function subtract (firstNum, secondNum) {
    return Math.round((parseFloat(firstNum) - parseFloat(secondNum)) * 1000) / 1000;
};
console.log(subtract(2,5));

//multiply
const multiply = function multiply (firstNum, secondNum) {
    return Math.round((parseFloat(firstNum) * parseFloat(secondNum)) * 1000) / 1000;
};
console.log(multiply(2,5));

//divide 
const divide = function divide (firstNum, secondNum) {
    // return Math.round((parseFloat(firstNum) / parseFloat(secondNum)) * 1000) / 1000;
    if (result > maxChars) {
        limitCharInDisplay(result);
        return firstNum / secondNum;
    } else {
        return Math.round((parseFloat(firstNum) / parseFloat(secondNum)) * 10000000) / 10000000;
    }
};
console.log(divide(2,5));

//positive to negative and vice-versa used in plusMinusButton and ran in operator function
const reverseNum = function reverseNum (firstNum, secondNum) {
    // return (parseInt(firstNum * -1)) (parseInt(secondNum * -1));
    if (firstNum > 0) {
        return (firstNum * -1);
    } else if (secondNum > 0) {
        return (secondNum * -1);
    } else if (firstNum < 0) {
        return (firstNum * -1);
    } else if (secondNum < 0) {
        return (secondNum * -1);
    }
}
console.log(reverseNum(10));

//to percentage button function
const toPercentage = function toPercentage (firstNum) {
    if (firstNum.length < 18) {
        return (firstNum / 100);
    } else {
        display.innerText = display.innerText.substring(0, 18); 
        firstNum = display.innerText; 
        return (firstNum / 100);
    }
}

//operator function for calculator
function operate (operator, firstNum, secondNum) {
    if (operator == "+") {
        add(firstNum, secondNum);
        return add(firstNum, secondNum);
    } else if (operator == "-") {
        subtract(firstNum, secondNum);
        return subtract(firstNum, secondNum);
    } else if (operator == "*") {
        multiply(firstNum, secondNum);
        return multiply(firstNum, secondNum);
    } else if (operator == "/") {
        divide(firstNum, secondNum);
        return divide(firstNum, secondNum);
    }
};



//applies click listeners to all buttons and runs calc(e) function on click
const buttons = document.querySelectorAll('button');
for (i=0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
        if (e.target.matches("button")){
            calc(e);
            limitCharInDisplay(e);
        } else if (e.target.matches("equals")) {
            operate(operator);
        }
        // change color of button on click 
        // let count = 1; 
        // function setColor(buttons, color) {
        //     if (count == 0) {
        //         buttons.style.backgroundColor = "#0EE9F2";
        //         count = 1;
        //     } else {
        //         buttons.style.backgroundColor = "#0EF2A7";
        //         count = 0;
        //     }
        // }
    })
};

// clears display with CE (Clear Entry) button click
const clearEntry = document.getElementById('clear');
clearEntry.addEventListener('click', function(event) {
    display.innerText = '0';
    firstNum = '';
    secondNum = '';
    operator = '';
});

//event listener for decimal click, doesn't allow more than one decimal (THIS WORKS!)
const decimal = document.getElementById('decimal');
decimal.addEventListener('click', function(event) {
    if (display.innerText == result) {
        firstNum = '';
        firstNum += '0' + decimal.innerText; 
        display.innerText = firstNum;
    }
    if (!firstNum.includes(".") && display.innerText.charAt(0) == "0") {
        firstNum += "0" + decimal.innerText;
        display.innerText = firstNum;
    } 
    if (!firstNum.includes(".") && !display.innerText.charAt(0) == "0") {
        firstNum += decimal.innerText;
        display.innerText = firstNum;
    }
    //adds zero before decimal if pressed at start of secondNum
    if (operator !== '' && firstNum !== '' && secondNum == '') {
        secondNum += "0" + decimal.innerText;
        display.innerText = secondNum;
    }
    else if (firstNum == result && secondNum == '' && operator == '' && e.target.innerText == '.') {
        firstNum = '';
        firstNum += "0" + decimal.innerText; 
        display.innerText = firstNum;
    }
    // if (display.innerText == result && e.target.innerText == '.') {
    //     firstNum = '';
    //     firstNum += "0" + decimal.innerText; 
    //     display.innerText = firstNum;
    // }
    //this allows for decimal to work on secondNum
    else if (operator !== '' && !secondNum.includes(".")) {
        secondNum += decimal.innerText;
         display.innerText = secondNum;
     }
})

function calc(e) {
    if (e.target.className === "number" || e.target.getElementById === "decimal") {
        if (operator == '' && display.innerText !== result && secondNum == '') {
            firstNum += e.target.innerText;
            display.innerText = firstNum;
        } else if (operator == '' && secondNum == '' && display.innerText == result) {
            display.innerText = '';
            secondNum += e.target.innerText; 
            display.innerText = secondNum;
        } else {
            display.innerText = '';
            secondNum += e.target.innerText;
            display.innerText = secondNum;
        }
    }
}

//adds event listeners for clicks to all operator buttons
ops = Array.prototype.slice.call(operators,0);
ops.forEach(op => {
    op.addEventListener("click", e => {
        if (e.target.innerText !== "=" && e.target.innerText !== "+/-" && operator == '' && firstNum !== '') {
            operator = e.target.innerText;
            console.log(firstNum);
            console.log(operator);
        } 

        //updates operator if changed midway through calculation
        if (display.innerText == firstNum && e.target.innerText !== '=') {
            operator = e.target.innerText;
        }

        //plusMinus if statement to validate +/- button and reset operator after executing
        if (e.target == plusMinusButton && display.innerText == firstNum) {
        console.log(firstNum);
        firstNum = reverseNum(firstNum)
        display.innerText = '';
        display.innerText = firstNum;
        }

        // changes secondNum to negative without running operator function
        if (e.target == plusMinusButton && display.innerText == secondNum) {
        secondNum = reverseNum(secondNum);
        console.log(secondNum);
        display.innerText = '';
        display.innerText = secondNum;
        }

        // if statement to validate % button 
        if (e.target == percentageButton && display.innerText !== "0" && secondNum == '') {
        newPercent = toPercentage(display.innerText);
        console.log(newPercent);
        display.innerText = '';
        display.innerText = newPercent;
        firstNum = display.innerText;
        }
         // trying to fix percentage button vvv
        if (e.target == percentageButton && display.innerText !== "0" && secondNum !== '') {
        newPercent = toPercentage(display.innerText);
        console.log(newPercent);
        display.innerText = '';
        display.innerText = newPercent;
        secondNum = display.innerText;
        }

        // runs operator function on all operator buttons, changes operator value to operator clicked
        if (e.target.innerText == "+" && secondNum !== "" || secondNum == ".") {
            result = operate(operator, firstNum, secondNum);
            console.log(secondNum)
            console.log(result);
            display.innerText = '';
            display.innerText += result;
            operator = '+';
        }
        if (e.target.innerText == "-" && secondNum !== "" || secondNum == ".") {
            result = operate(operator, firstNum, secondNum);
            console.log(secondNum)
            console.log(result);
            display.innerText = '';
            display.innerText += result;
            operator = "-"; 
        }
        if (e.target.innerText == "*" && secondNum !== "" || secondNum == ".") {
            result = operate(operator, firstNum, secondNum);
            console.log(secondNum)
            console.log(result);
            display.innerText = '';
            display.innerText += result;
            operator = "*";
        }
        if (e.target.innerText == "/" && secondNum !== "" || secondNum == ".") {
            result = operate(operator, firstNum, secondNum);
            console.log(secondNum)
            console.log(result);
            display.innerText = '';
            display.innerText += result;
            operator = "/";
        }
        
        //creates functional equals button, runs operator function, displays result 
        if (e.target.innerText == "=" && firstNum !== ''  && secondNum !== '' && operator !== '') {
            result = operate(operator, firstNum, secondNum);
            display.innerText = '';
            display.innerText = result;
            operator = '';              
        } 
        else if (e.target.innerText == '=' && operator == '' && firstNum == result && secondNum !== '') {
            firstNum = secondNum;
            secondNum = ''
            display.innerText = firstNum; 
        } 
        
        // prevents secondNum from continuously becoming what's clicked (numbers keep getting added to secondNum w/o)
        if (display.innerText == result) {
            firstNum = result; 
            secondNum = '';
            secondNum += e.target.value;
        } 
        
        //do not run operator function if operator is empty
        // if (firstNum !== '' && secondNum !== '' && operator == '' && e.target.innerText == '=') {
        //     return;
        // }
    });
});