// Solution for 4kyu Kata "Twice linear" https://www.codewars.com/kata/5672682212c8ecf83e000050/train/javascript

let uArr = [1];
let prevI = 0;

function dblLinear(n) {
  if (uArr[n]) return uArr[n];
  let y, z, i = prevI;

  while (i < n) {
    let x = uArr[i];
    y = 2 * x + 1;
    z = 3 * x + 1;
    if (y < uArr.at(-1)) {
      for (let i = uArr.length - 1; i > 0; i--) {
        if (y === uArr[i - 1]) break;
        if (y > uArr[i-1]) {
          uArr.splice(i, 0, y);
          break;
        }
      }
    }
    else if (y > uArr.at(-1)) {
      uArr.push(y);
    }
    if (z < uArr.at(-1)) {
      for (let i = uArr.length - 1; i > 0; i--) {
        if (z === uArr[i - 1]) break;
        if (z > uArr[i-1]) {
          uArr.splice(i, 0, z);
          break;
        }
      }
    }
    else if (z > uArr.at(-1)) {
      uArr.push(z);
    }
    i++;
  }
  prevI = i;
  return(uArr[n])
}