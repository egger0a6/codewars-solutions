// Solution for 7kyu Kata "Christmas mission: Programmer's Christmas #1" https://www.codewars.com/kata/58520e8edeb17c711c00019b

function merryChristmas(funcs) {
  const s = "Merry Christmas!"
  const funcChars = {};
  let orderStr = "";

  for (const func of funcs) {
    funcChars[func()] = func.name;
  }

  for (const c of s) {
    orderStr += funcChars[c] + ",";
  }

  return orderStr.slice(0, -1);
}