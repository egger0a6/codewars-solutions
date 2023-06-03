// solution for 4kyu Kata "Find the Unknown Digit" https://www.codewars.com/kata/546d15cebed2e10334000ed9/train/javascript

function solveExpression(exp) {
  console.log(exp)
  let unknownVal = -1;
  let i = 0;
  exp = exp.split(/(-?[0-9?]+)([-+*=])(-?[0-9?]+)(=)(-?[0-9?]+)/).filter(delim => delim)
  exp.forEach(item => {
    if (item.length >= 2 && /^\?+$/.test(item)) {
      i = 1;
    }
  });
  //exp = exp.match(/(-?[0-9?]+)([-+*=])(-?[0-9?]+)(=)(-?[0-9?]+)/);
  //exp = exp.match(/-?[0-9?]+|[-+*=]|-?[0-9?]|\+|=-?[0-9?]+/g);
  console.log(exp)

  // Loop on digits 0/1-9 replacing the ? in each expression with the digit
  // and input into eval().
  for (i; i < 10; i++) {
    let tempExp = exp.map(item => item.replaceAll("?", i));
    if (eval(tempExp.slice(0,3).join(" ")) === eval(tempExp[4])) {
      if (exp.some(el => el.includes(i))) {
        continue;
      }
      unknownVal = i;
      break;
    }
  }
  console.log(unknownVal)
  return unknownVal;
}


solveExpression('19--45=5?');
solveExpression("?55313-432392=222931");
solveExpression('1+1=?');
solveExpression("?*11=??");