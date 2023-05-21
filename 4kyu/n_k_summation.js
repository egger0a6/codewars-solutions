// Solution to 4kyu Kata "n^k summation" https://www.codewars.com/kata/53e57dada0cb0400ba000688/train/javascript

// method using Faulhaber's formula https://www.wikiwand.com/en/Faulhaber%27s_formula

var equation = function (exp) {
  let coeff = 1 / (exp + 1),
      expanedFormula = "",
      binomCoeff, 
      bernNum,
      expon;

  let currExpr = "";
  for (let k = 0; k < exp+1; k++) {
    bernNum = calcBernoulliNum(k);
    if (!bernNum) continue;
    binomCoeff = binomCoeff(exp+1, k);
    expon = exp - k + 1;
    currExpr += 
      ``
  }
}

function calcBernoulliNum(n) {
  let arr = [];
  for (let i = 0; i < n + 1; i++) {
    arr[i] = 1 / (i + 1);
    for (let j = i; j > 0; j--) {
      console.log(arr)
      arr[j-1] = j * (arr[j-1] - arr[j])
    }
  }
  console.log(arr)
  return arr[0];
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
    console.log(arr)
  }
  console.log(arr)
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

function subFrac(fOne, fTwo) {
  let diff = [];
  let gcd = calcGcd(fOne[1], fTwo[1]);
  // frac1 + (-)frac2
  diff.push((fOne[0] * fTwo[1] / gcd) + ((BigInt(-1)*fTwo[0]) * fOne[1] / gcd));
  diff.push(fOne[1] * fTwo[1] / gcd);
  return diff;
}

console.log(calcBernoulliNum(1))
console.log(calcBernoulliNumFrac(5))