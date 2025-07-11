const allMyButtons = document.querySelectorAll(".myButton");
const sevenSegments = document.querySelector("input");

let arrayOfCalc = [];
let indexOfArray = 0;
let lastResutl = "";
const resultKeyCode = [13, 187];
const addNumberKeyCode = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
const floatBetweenNumber = [110, 190];
const operationForNumbers = [111, 106, 109, 107, 16, 189];
const acResetKeyCode = [46, 27];
const ceResetKeyCode = [8, 32];



const addNumber = (index, value, type) => {

    if (index == 0 && value == "0") {
        return
    } else if (index == 0 && value != "0") {

        arrayOfCalc.push({
            index, value, type
        })
        sevenSegments.value += value;
        indexOfArray++;





    } else if (index > 0 && arrayOfCalc[index - 1].value !== "0" && arrayOfCalc[index - 1].type === "number" || arrayOfCalc[index - 1].type === "float") {
        let newNumber = arrayOfCalc[index - 1].value;


        newNumber = newNumber.concat(value);
        arrayOfCalc[index - 1].value = newNumber;
        sevenSegments.value += value;



    } else if (index > 0 && arrayOfCalc[index - 1].type === "string") {
        arrayOfCalc.push({
            index, value, type
        })
        sevenSegments.value += value;
        indexOfArray++;


    }

}


const addOp = (index, value, type) => {


    if (index != 0 && arrayOfCalc[index - 1].type !== "string") {

        arrayOfCalc.push({
            index, value, type
        })
        sevenSegments.value += value
        indexOfArray++;


    }



}
const aCRest = () => {
    arrayOfCalc = [];
    sevenSegments.value = "";
    indexOfArray = 0;


}
const ceReset = () => {
    arrayOfCalc.pop();


    sevenSegments.value = "";
    arrayOfCalc.forEach((item) => {
        sevenSegments.value += item.value
    });
    indexOfArray--;
}

const float = (index, value, float) => {
    if (arrayOfCalc[index - 1] && arrayOfCalc[index - 1].type === "number") {
        let newNumber = arrayOfCalc[index - 1].value;
        newNumber = newNumber.concat(value);
        arrayOfCalc[index - 1].value = newNumber;
        sevenSegments.value += value;
    }
}
const result = () => {
    let minimumTwoNumber = arrayOfCalc.filter((item) => item.type === "number");
    lastResutl = "";
    if (minimumTwoNumber.length >= 2) {

        arrayOfCalc.forEach((item) => {
            lastResutl += item.value
        });

        lastResutl = eval(lastResutl);
        sevenSegments.value = "";
        sevenSegments.value = lastResutl;
        lastResutl = String(lastResutl);

    }
}

allMyButtons.forEach((item) => {
    item.addEventListener("click", () => {
        switch (item.classList[1]) {
            case "addad":
                addNumber(indexOfArray, item.innerText, "number");
                break;
            case "op":
                addOp(indexOfArray, item.innerText, "string");
                break;
            case "acReset":
                aCRest();

                break;
            case "ceReset":
                ceReset();
                break;
            case "float":
                float(indexOfArray, item.innerText, "float");
                break;
            case "result":
                result()
                break;
            case "Hundred":
                lastResutl = "";
                if (arrayOfCalc.length == 1) {
                    let c = (eval(arrayOfCalc[0].value)) / 100;

                    sevenSegments.value = "";
                    sevenSegments.value = c
                } else if (arrayOfCalc.length > 1) {
                    let latestNumber = (arrayOfCalc[arrayOfCalc.length - 1].value) * 10;
                    arrayOfCalc.forEach((item) => {
                        if (item.index != arrayOfCalc[arrayOfCalc.length - 1].index) {
                            lastResutl += item.value;
                        }
                    })
                    lastResutl += latestNumber;
                    sevenSegments.value = "";
                    lastResutl = eval(lastResutl);
                    sevenSegments.value = lastResutl;
                }

                break;
            case "radical":
                lastResutl = "";
                if (arrayOfCalc.length > 1) return;
                lastResutl = Math.sqrt(arrayOfCalc[0].value);
                sevenSegments.value = "";
                sevenSegments.value = lastResutl
                break;
            default:
                break;

        }
    })

});


window.addEventListener("keydown", (e) => {


    const myKeyCode = e.keyCode;
    if (myKeyCode === 13 || myKeyCode === 187) {
        result();

    } else if (myKeyCode == 96 || myKeyCode == 97 || myKeyCode == 98 || myKeyCode == 99 || myKeyCode == 100 || myKeyCode == 101 || myKeyCode == 102 || myKeyCode == 103 || myKeyCode == 104 || myKeyCode == 105 || myKeyCode == 48 || myKeyCode == 49 || myKeyCode == 50
        || myKeyCode == 51 || myKeyCode == 52 || myKeyCode == 53 || myKeyCode == 54 || myKeyCode == 55 || myKeyCode == 56 || myKeyCode == 57
    ) {
        addNumber(indexOfArray, e.key, "number")
    } else if (myKeyCode === 110 || myKeyCode === 190) {

        float(indexOfArray, e.key, "float");


    } else if (myKeyCode == 111 || myKeyCode == 106 || myKeyCode == 109 || myKeyCode == 107 || myKeyCode == 16 || myKeyCode == 189) {

        addOp(indexOfArray, e.key, "string")
    } else if (myKeyCode == 46 || myKeyCode == 27) {
        aCRest();
    } else if (myKeyCode == 8 || myKeyCode == 32) {
        ceReset();
    } else {
        return

    }


})
