'use strict'

function BinarioADecimal(num) {
  // tu codigo aca
  let dec = 0;
  let arr = num.toString().split("");
  let myStr = arr.reverse().join("");
  for (let i=0; i<=myStr.length - 1; i++) {
    let bin = parseInt(myStr[i]);
    dec += ((2**i)*bin);
  }
  return dec;
}

function DecimalABinario(num) {
  // tu codigo aca
  let myArr = [];
  let residuo = num % 2;
  let coc = Math.trunc(num / 2);
  myArr.push(residuo);
  while(coc >= 2) {
    residuo = coc % 2;
    coc = Math.trunc(coc / 2);
    myArr.push(residuo);
  }
  myArr.push(coc % 2);
  let bin = myArr.reverse().join("");
  return bin;
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}