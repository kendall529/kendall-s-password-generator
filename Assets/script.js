// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function arrayLowToHighs(x, y) {
  var array = []
  for(var i = x; i <= y; i++) {
    array.push(i)
  }
  return array;
}

var lowerCharCodes = arrayLowToHighs(97, 122);
var upperCharCodes = arrayLowToHighs(65, 90);
var numberCharCodes = arrayLowToHighs(48, 57);
var symbolCharCodes = arrayLowToHighs(33, 47).concat(arrayLowToHighs(58, 64)).concat(arrayLowToHighs(91, 96)).concat(arrayLowToHighs(123, 126));

function writePassword() {
  var passwordLength = prompt('How many characters?');
  if(passwordLength === null) {
    return;
  }
  passwordLength = Number(passwordLength);
  if(isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
    alert(passwordLength + ' is not a valid number between 8 and 128');
    return;
  }  

  var useLower = confirm('Include lowercase letters?');
  var useUpper = confirm('Include uppercase letters?');
  var useNumbers = confirm('Include numbers?');
  var useSymbols = confirm('Include symbols?');

if(!useLower && !useUpper && !useNumbers && !useSymbols) {
  alert('At least one type of character must be selected');
  return;
}

  var password = generatePassword(passwordLength, useUpper, useLower, useNumbers, useSymbols);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;


}

function generatePassword(passwordLength, useUpper, useLower, useNumbers, useSymbols) {
  var charCodes = [];
  if(useLower) 
    charCodes= charCodes.concat(lowerCharCodes)
  if(useUpper)
    charCodes = charCodes.concat(upperCharCodes)
  if(useNumbers) 
    charCodes = charCodes.concat(numberCharCodes)
  if(useSymbols) 
    charCodes = charCodes.concat(symbolCharCodes)

// I used other built in functions here like math.floor and math.random but
// Ultimately Chat GPT taught me the ones below. But I did still do all the work
// It's just that it said this was a more secure way and I thought that was cool

  var password = '';
  var randomValues = new Uint32Array(passwordLength);
  window.crypto.getRandomValues(randomValues);
  for(var i = 0; i < passwordLength; i++) {
    var charCode = charCodes[randomValues[i] % charCodes.length]
    password += String.fromCharCode(charCode)
  }
  return password;
}




// Add event listener to generate button
generateBtn.addEventListener("click", writePassword) 


