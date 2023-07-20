/* In this JavaScript File, I have noted what code here is "tutorial code"
* as opposed to code specifically for the calculator. Any code between the
* beginning and end of the tutorial code can be removed without affecting
* the calculator. Any incomplete or incorrect JavaScript code will still
* cause problems, though, no matter where it is.
*/

/* Begin Tutorial Code */

   // The following event listener will run only after a page finishes loading
  window.addEventListener(
       "load",
       function() {
           console.log("The page is loaded. All HTML elements are loaded by "
           + "the time this runs, so there will be no trouble accessing them. "
           + "Since this function will not run until the page is loaded, it "
           + "can be put anywhere in the HTML document and never cause "
           + "problems.");
       }
   );

   // document.getElementById("calculator").addEventListener(
   //     "click",
   //     function() {
   //         console.log("You clicked on a div with ID calculatorID!")
   //     }
   // );

   // Getting ahold of HTML element(s)
       document.getElementById("calculator") // a single HTML element
       document.getElementsByClassName("calculator") // an array of HTML elements, even if the array has a length of only 1
       document.getElementsByTagName("div") // an array of HTML elements, even if the array has a length of only 1

       /** 
        * Query selector searches the HTML from the top to the bottom and gives you
        * the first HTML element that matches the provided selector
        */
       // querySelector is a method 
       document.querySelector("#calculator") // a single HTML element
       document.querySelector(".calculator") // a single HTML element
       document.querySelectorAll("div") // an array of HTML elements

/* End Tutorial Code */

const calculator = document.querySelector(".calculator");

/** 
* Notice the following line uses an HTML element as the starting point instead
* of the whole document (either can be used)
*/ 
const keys = calculator.querySelector(".calculator__keys");

/* Begin Tutorial Code */


   // keys.addEventListener("click", e => {
   //     if (e.target.matches("button")) {
   //         alert("well hello there");
   //     }
   // });

   // keys.addEventListener("click", function(event) {
   //     if (event.target.matches("button")) {
   //         alert("hi there");
   //     }
   // });

   const display = document.querySelector('.calculator__display')
   
   //Syntax: element.addEventListener(event, function, useCapture);
   keys.addEventListener('click', e => {
       if (e.target.matches('button')) {
         
         var myVariable;
         let anotherVariable;
         const key = e.target // DEBUG
         // console.log("key: " + key);
         const action = key.dataset.action // how is dataset relate to data-action in html
         // console.log("action: " + action);
         const keyContent = key.textContent
         // console.log("keyContent: " + keyContent);
         const displayedNum = display.textContent
         // console.log("displayedNum: " + displayedNum);
         const previousKeyType = calculator.dataset.previousKeyType
         
         // Remove .is-depressed class from all keys
         Array.from(key.parentNode.children)
           .forEach(k => k.classList.remove('is-depressed')) // for k could it be replaced by any other characters?

         // A number is clicked
         if (!action) { // if action has no value
           if (displayedNum === '0'  || previousKeyType === 'operator') {
             display.textContent = keyContent;
           }else {
               display.textContent = displayedNum + keyContent;
             }

             calculator.dataset.previousKeyType = 'number';
         }

         // Operator is clicked
         if (
           action === 'add' ||
           action === 'subtract' ||
           action === 'multiply' ||
           action === 'divide'
         ) {
           // 3 + 4 + 5
           // 7(firstValue) +(operator) 8(secondValue) + 3
           const firstValue = calculator.dataset.firstValue;
           const operator = calculator.dataset.operator;
           const secondValue = displayedNum;

           // Note: It's sufficient to check for firstValue and operator because secondValue always exists 

           if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'){ 
             // 3 && add
             const calcValue = calculate(firstValue, operator, secondValue);
              display.textContent = calcValue;
             
             // Update calculated value as firstValue
             calculator.dataset.firstValue = calcValue;
           }else {
             // If there are no calculations, set displayedNum as the firstValue
             calculator.dataset.firstValue = displayedNum;
           }

           key.classList.add('is-depressed')
           calculator.dataset.previousKeyType = 'operator';
           calculator.dataset.operator  = action; // add


         }

         // Decimal is clicked
         if (action === 'decimal') {
            if (previousKeyType=== 'operator'|| previousKeyType === 'calculate'){
             display.textContent = "0.";
           } else if(!displayedNum.includes('.')){
             display.textContent = displayedNum + '.';
           }
           calculator.dataset.previousKeyType = 'decimal' // what would happend if this line is include in the if !displayedNum
         }
         
         // Clear is clicked
         if (action === 'clear') {
           if(key.textContent === 'AC') {
             calculator.dataset.firstValue = '';
             calculator.dataset.modValue = '';
             calculator.dataset.operator = '';
             calculator.dataset.previousKeyType = '';
           } else {
             key.textContent = 'AC'
           }
           
           display.textContent = '0';
           calculator.dataset.previousKeyType = 'clear'
         }

         // Anything except Clear is clicked
         if(action !== 'clear') {
           const clearButton = calculator.querySelector('[data-action=clear]')
           clearButton.textContent = 'CE';
         }
         
         // calculate/equal is clicked
         if (action === 'calculate') {
         
           // FV + SV = Result
           
           let firstValue = calculator.dataset.firstValue;  
           const operator = calculator.dataset.operator;
           let secondValue = displayedNum;

           if (firstValue) {
             if (previousKeyType === 'calculate') {
               firstValue = displayedNum;
               secondValue = calculator.dataset.modValue;
             }
         
             display.textContent = calculate(firstValue, operator, secondValue);
           }

           calculator.dataset.modValue = secondValue;
           calculator.dataset.previousKeyType = 'calculate';
         }
       }
     });

// Begin Tutorial Code 


     const calculateThis = (n1, operator, n2) => {
 // Perform calculation and return calculated value
}

   function calculateThat (n1, operator, n2)  {
 // Perform calculation and return calculated value
}

// End Tutorial Code 

const calculate = (n1, operator, n2) => {
 let result = ''
 
 if (operator === 'add') {
   result = parseFloat(n1) + parseFloat(n2)
 } else if (operator === 'subtract') {
   result = parseFloat(n1) - parseFloat(n2)
 } else if (operator === 'multiply') {
   result = parseFloat(n1) * parseFloat(n2)
 } else if (operator === 'divide') {
   result = parseFloat(n1) / parseFloat(n2)
 }

 return result
}