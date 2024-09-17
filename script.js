const num1 = document.querySelector("#num1");
const num2 = document.querySelector("#num2");
const select = document.querySelector("#select");
const btn = document.querySelector("#btn");
const span = document.querySelector("span");
let ans;


select.addEventListener("change", () => {
    if (select.value == "null") {
        select.style = "color:grey";
    }
    else {
        select.style = "color:black";
    }
})

btn.addEventListener("click", () => {
    switch (select.value) {
        case "Binary To Decimal":
            num2.value = binaryToDecimal(num1.value);
            break;

        case "Binary To Hexa":
            num2.value = binaryToHexa(num1.value);
            break;

        case "Decimal To Binary":
            let binary = decimalToBinary(num1.value);
            binary ? num2.value = addZero(binary, 4) : num2.value = "";
            break;

        case "Decimal To Octal":
            num2.value = decimalToOctal();
            break;

        case "Decimal To Hexa":
            num2.value = decimalToHexa(num1.value);
            break;

        case "Octal To Decimal":
            num2.value = octalToDecimal();
            break;

        case "Binary To Octal":
            num2.value = binaryToOctal(num1.value);
            break;

        case "Octal To Binary":
            let octalBinary = octalToBinary(num1.value);
            octalBinary ? num2.value = addZero(octalBinary, 3) : num2.value = "";
            break;

        case "Octal To Hexa":
            num2.value = octalToHexa(num1.value);
            break;

        case "Hexa To Decimal":
            num2.value = hexaToDecimal(num1.value);
            break;

        case "Hexa To Binary":
            num2.value = hexaToBinary(num1.value);
            break;

        case "Hexa To Octal":
            num2.value = hexaToOctal(num1.value);
            break;
    }
    span.style = `background:linear-gradient(to right,${getRandomColor()},${getRandomColor()})`;
})

const decimalToBinary = (decimalNumber) => {
    if (!isDecimal(decimalNumber)) {
        return "";
    }
    let num = parseInt(decimalNumber);
    let binary = "";

    while (num != 0) {
        let rem = num % 2;
        binary += rem;
        num = parseInt(num / 2);
    }
    binary = reverseString(binary);
    return binary;

}



const binaryToDecimal = (binary) => {
    if (!isBinary(binary)) {
        return "";
    }
    let num = binary.split('');
    let decimal = 0;
    // console.log(num);
    let j = 0;
    for (let i = num.length - 1; i >= 0; i--) {
        let bit = parseInt(num[i]) * Math.pow(2, j);
        // console.log(bit);
        decimal += bit;
        j++;
    }
    console.log(decimal);
    return decimal;
}

const binaryToHexa = (binary) => {
    if (!isBinary(binary)) {
        return "";
    }
    let num = binary.split('');
    let hexaBinary = [];
    let binaryDigits = "";
    let count = 0;
    for (let i = num.length - 1; i >= 0; i--) {

        if (count == 4) {
            hexaBinary.push(reverseString(binaryDigits));
            binaryDigits = "";
            count = 0;
        }
        binaryDigits += num[i];
        count++;
    }
    hexaBinary.push(reverseString(binaryDigits))
    console.log(hexaBinary);

    let hexa = "";
    for (let i = hexaBinary.length - 1; i >= 0; i--) {
        let decimal = binaryToDecimal(hexaBinary[i]);
        hexa += getHexa(decimal);
    }
    console.log(hexa);
    return hexa;
}

const decimalToOctal = () => {
    if (!isDecimal(num1.value)) {
        return "";
    }
    let num = num1.value;
    let octal = "";

    while (num != 0) {
        let rem = num % 8;
        octal += rem;
        num = parseInt(num / 8);
        // console.log(rem);
    }
    octal = reverseString(octal);
    console.log(octal);
    return octal;
}

const decimalToHexa = (decimalNumber) => {
    if (!isDecimal(decimalNumber)) {
        return "";
    }
    let num = parseInt(decimalNumber);
    let hexa = "";
    while (num != 0) {
        let rem = num % 16;
        rem = getHexa(rem);
        hexa += rem;
        num = parseInt(num / 16);
    }
    hexa = reverseString(hexa);
    console.log(hexa);
    return hexa;
}


const binaryToOctal = (binaryNumber) => {
    let num = binaryNumber;
    if (!isBinary(num)) {
        return "";
    }
    let octalBinary = [];
    let binary = "";
    let count = 0;
    for (let i = num.length - 1; i >= 0; i--) {
        if (count == 3) {
            octalBinary.push(reverseString(binary));
            binary = "";
            count = 0;
        }
        binary += num[i];
        count++;
    }
    if (binary != "") {
        octalBinary.push(reverseString(binary));
    }
    console.log(octalBinary);

    let octal = 0;
    for (let i = octalBinary.length - 1; i >= 0; i--) {
        let decimal = binaryToDecimal(octalBinary[i]);
        octal = octal * 10 + parseInt(decimal);
        console.log(decimal);
    }
    console.log(octal);
    return octal;
}

const octalToDecimal = () => {
    if (!isOctal(num1.value)) {
        return "";
    }
    let num = num1.value.split('');
    let decimal = 0;
    let j = 0;
    for (let i = num.length - 1; i >= 0; i--) {
        decimal = decimal + parseFloat(num[i]) * Math.pow(8, j);
        j++;
    }
    console.log(decimal);
    return decimal;

}

const octalToBinary = (octalNumber) => {
    if (!isOctal(octalNumber)) {
        return "";
    }
    let num = octalNumber.split('');
    let binaryNumbers = [];
    for (let i = 0; i < num.length; i++) {
        let binary = decimalToBinary(num[i]);
        if (binary == '') {
            binary = "000";
        }
        binaryNumbers.push(binary);
    }
    let octalBinary = binaryNumbers.join('');
    console.log(octalBinary);
    return octalBinary;
}

const octalToHexa = (octalNumber) => {
    let binary = octalToBinary(octalNumber);
    console.log(binary);
    let hexa = binaryToHexa(binary);
    console.log(hexa);
    return hexa;
}

const hexaToBinary = (hexa) => {
    let num = [];
    for (let i = 0; i < hexa.length; i++) {
        num.push(getDecimal(hexa[i]));
    }
    console.log(num);
    let binary = [];
    for (let i = 0; i < num.length; i++) {
        binary.push(addZero(decimalToBinary(num[i]), 4));
    }
    binary = binary.join('');
    console.log(binary);
    return binary;
}

const hexaToOctal = (hexa) => {
    let binary = hexaToBinary(hexa);
    let octal = binaryToOctal(binary);
    console.log(octal);
    return octal;

}

const hexaToDecimal = (hexa) => {
    let num = [];
    for (let i = 0; i < hexa.length; i++) {
        num.push(getDecimal(hexa[i]));
    }
    // console.log(num);
    let decimal = 0;
    let j = 0;
    for (let i = num.length - 1; i >= 0; i--) {
        decimal = decimal + (parseInt(num[i]) * Math.pow(16, j));
        j++;
    }
    console.log(decimal);
    return decimal;
}

function addZero(binary, digits) {
    if (binary.length < digits) {
        let zero = "";
        for (let i = 0; i < digits - binary.length; i++) {
            zero += '0';
        }
        binary = binary.split('');
        binary.unshift(zero);
        binary = binary.join('');
    }
    console.log(binary);
    return binary;
}

function reverseString(str) {
    let s = "";
    for (let i = str.length - 1; i >= 0; i--) {
        s += str.charAt(i);
    }
    return s;
}

function getHexa(hexa) {
    if (hexa >= 0 && hexa <= 9) {
        return hexa;
    }
    else if (hexa == 10) {
        return 'A';
    }
    else if (hexa == 11) {
        return 'B';
    }
    else if (hexa == 12) {
        return 'C';
    }
    else if (hexa == 13) {
        return 'D';
    }
    else if (hexa == 14) {
        return 'E';
    }
    else if (hexa == 15) {
        return 'F';
    }
    else {
        return "invalid";
    }
}

function getDecimal(hexa) {
    if (hexa >= 0 && hexa <= 9) {
        return hexa;
    }
    else if (hexa == 'A' || hexa == 'a') {
        return '10';
    }
    else if (hexa == 'B' || hexa == 'b') {
        return '11';
    }
    else if (hexa == 'C' || hexa == 'c') {
        return '12';
    }
    else if (hexa == 'D' || hexa == 'd') {
        return '13';
    }
    else if (hexa == 'E' || hexa == 'e') {
        return '14';
    }
    else if (hexa == 'F' || hexa == 'f') {
        return '15';
    }
    else {
        return "invalid";
    }
}

function isBinary(num) {
    num = num.split('');
    for (let i = 0; i < num.length; i++) {
        if (num[i] != '1' && num[i] != '0') {
            alert("Input Binary Number is Invalid");
            return false;
        }
    }
    return true;
}

function isOctal(octal) {
    let num = octal.split('');
    for (let i = 0; i < num.length; i++) {
        if (num[i] < '0' || num[i] >= '8') {
            alert("Input Octal Number is Invalid");
            return false;
        }
    }
    return true;
}

function isDecimal(decimal) {
    let num = decimal.split('');
    for (let i = 0; i < num.length; i++) {
        if (num[i] < '0' || num[i] > '9') {
            alert("Input Decimal Number is Invalid");
            return false;
        }
    }
    return true;
}

function getRandomColor()
{
    const str = "0123456789abcdef";
    let color = "#";
    for(let i=0;i<6;i++)
    {
        let index = Math.floor(Math.random() * str.length); 
        color += str[index];
    }
    console.log(color);
    return color;
}

