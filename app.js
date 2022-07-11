document.addEventListener("DOMContentLoaded", function(){
    
    class Calculator{
        constructor(previousOperand, nextOperand){
            this.previousOperand=previousOperand;
            this.nextOperand=nextOperand;
            this.clearResult();
        };

        clearResult(){
            this.nextOperand1 = "0";
            this.previousOperand1 = "";
            this.operatorElements1 = "";
        };

        backspaceCharacter(){
            this.nextOperand1 = this.nextOperand1.toString().slice(0,-1);
        };

        appendNumberToResultBox(number){
            if(number === "." && this.nextOperand1.includes(".")) return 0;
            
            this.nextOperand1 = this.nextOperand1.toString()+number.toString();
        };

        selectOperation(operatorElements1){
            if(this.nextOperand1 === "") return 0;
            if(this.previousOperand1 !== ""){
                this.calculateResult();
            }

            this.operatorElements1 = operatorElements1;
            this.previousOperand1 = this.nextOperand1;
            this.nextOperand1 = "";
        };

        calculateResult(){
            let computedResult;
            let p = parseFloat(this.previousOperand1);
            let n = parseFloat(this.nextOperand1);
            if(isNaN(p) || isNaN(n)) return 0;
            switch(this.operatorElements1){
                case "+":
                    computedResult = p+n;
                    break;
                case "-":
                    computedResult = p-n;
                    break;
                case "*":
                    computedResult = p*n;
                    break;
                case "/":
                    computedResult = p/n;
                    break;
                case "%":
                    computedResult = p%n;
                    break;
                default:
                    return 0;
            }
            
            this.nextOperand1 = computedResult;
            this.operatorElements1 = undefined;
            this.previousOperand1 = "";
        };

        getDisplayNumber(number){
            let strNumber = number.toString();
            let intDigits = parseFloat(strNumber.split(".")[0]);
            let decimalDigits = strNumber.split(".")[1];
            let intDisplay=0;

            if(isNaN(intDigits)) intDisplay="";
            else intDisplay = intDigits.toLocaleString("en");

            if(decimalDigits != null) return `${intDisplay}.${decimalDigits}`;
            else return intDisplay;
            
        };

        updateDisplay(){
            let space = "";
            this.nextOperand.innerHTML =
                this.getDisplayNumber(this.nextOperand1);
            if (this.operatorElements1!= null) {
                this.previousOperand.innerHTML =
                    `${this.getDisplayNumber(this.previousOperand1)} ${this.operatorElements1}`;
            }
            
            else this.previousOperand.innerHTML = space;
        }
    };
    
    var numberElements = document.getElementsByClassName("number");
    var operatorElements = document.getElementsByClassName("operator");
    var equalToElement = document.getElementById("equal");
    var deleteElement = document.getElementById("delete");
    var clearElement = document.getElementById("clear");
    var previousOperand = document.getElementById("prev-operand");
    var nextOperand = document.getElementById("next-operand");

    var calculatorObject = new Calculator(previousOperand, nextOperand);

    Array.from(numberElements).forEach(item=>{
        item.addEventListener("click", function(){
            calculatorObject.appendNumberToResultBox(item.innerHTML);
            calculatorObject.updateDisplay();
        });
    });

    Array.from(operatorElements).forEach(item1=>{item1.addEventListener("click", function(){
            calculatorObject.selectOperation(item1.innerHTML);
            calculatorObject.updateDisplay();
        });
    });

    equalToElement.addEventListener("click", function(){
        calculatorObject.calculateResult();
        calculatorObject.updateDisplay();
    });

    clearElement.addEventListener("click", function(){
        calculatorObject.clearResult();
        calculatorObject.updateDisplay();
    });

    deleteElement.addEventListener("click", function(){
        calculatorObject.backspaceCharacter();
        calculatorObject.updateDisplay();
    });
});