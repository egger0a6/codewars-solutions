// Solution to 4kyu Kata "n^k summation" https://www.codewars.com/kata/53e57dada0cb0400ba000688/train/javascript

// method using Faulhaber's formula https://www.wikiwand.com/en/Faulhaber%27s_formula

var equation = function (exp) {
  let coeff = [1, BigInt(exp + 1)], // 1 / (p + 1)
      expanedFormula = "",
      binomCoeff, 
      bernNum,
      expon;

  let currExpr,
      currCoeff,
      num,
      den;
  for (let k = 0; k < exp+1; k++) {
    currExpr = "";
    bernNum = reduceFrac(calcBernoulliNumFrac(k));
    console.log("Bernoulli number: " + bernNum)
    if (!bernNum[0]) continue;
    binomCoeff = [BigInt(binomialCoeff(exp+1, k)), coeff[1]];
    console.log("Binomial coeff: " + binomCoeff)
    currCoeff = reduceFrac([binomCoeff[0] * bernNum[0], binomCoeff[1] * bernNum[1]]);
    console.log("Current coeff: " + currCoeff)
    num = currCoeff[0];
    den = currCoeff[1];
    expon = exp - k + 1;
    if (expanedFormula) {
      currExpr += 
      `${(num < 0 || den < 0) ? " - " : " + "}` +
      `${num}/${den}`.replace("-", "") +
      `n${expon > 1 ? "^"+expon : ""}`;
    }
    else {
      if (den > 1) {
        currExpr += 
        `${(num < 0 || den < 0) ? " - " : ""}` +
        `${num}/${den}`.replace("-", "") +
        `n${expon > 1 ? "^"+expon : ""}`;
      }
      else {
        currExpr += 
        `${(num < 0 || den < 0) ? " - " : ""}` +
        `n${expon > 1 ? "^"+expon : ""}`;
      }
    }
    console.log("currExpr: " + currExpr)
    expanedFormula += currExpr;
  }
  console.log()
  return expanedFormula;
}

function calcGcd(a, b) {
  return b ? calcGcd(b, a % b) : a;
}

function calcBernoulliNumFrac(n) {
  let arr = [];
  for (let i = 0; i < n + 1; i++) {
    // index 0 = numerator, 1 = denominator
    arr[i] = [BigInt(1), BigInt(i + 1)];
    let diff;
    for (let j = i; j > 0; j--) {
      diff = subFrac(arr[j-1], arr[j]);
      arr[j-1] = [BigInt(j) * diff[0], diff[1]];
    }
  }
  return arr[0];
}

function binomialCoeff(n, k) {
  let coeff = 1;
  for (let i = n - k + 1; i <= n; i++) {
    coeff *= i;
  }
  for (i = 1; i <= k; i++) {
    coeff /= i;
  }
  return coeff;
}

// subtract two fractions
function subFrac(fOne, fTwo) {
  let diff = [];
  let gcd = calcGcd(fOne[1], fTwo[1]);
  // frac1 + (-)frac2
  diff.push((fOne[0] * fTwo[1] / gcd) + ((BigInt(-1)*fTwo[0]) * fOne[1] / gcd));
  diff.push(fOne[1] * fTwo[1] / gcd);
  return diff;
}

// reduce a fraction by dividing numerator and denominator by thier GCD
function reduceFrac(frac) {
  let gcd = calcGcd(frac[0], frac[1]);
  return [frac[0] / gcd, frac[1]/ gcd];
}

// function calcBernoulliNum(n) {
//   let arr = [];
//   for (let i = 0; i < n + 1; i++) {
//     arr[i] = 1 / (i + 1);
//     for (let j = i; j > 0; j--) {
//       console.log(arr)
//       arr[j-1] = j * (arr[j-1] - arr[j])
//     }
//   }
//   console.log(arr)
//   return arr[0];
// }

console.log(reduceFrac(calcBernoulliNumFrac(4)))
console.log(equation(0))
console.log(equation(1))
console.log(equation(4))