// Solution to 4kyu Kata "n^k summation" https://www.codewars.com/kata/53e57dada0cb0400ba000688/train/javascript

// method using Faulhaber's formula

var equation = function (exp) {
  //enter code here 
}

function calcBernoulliNum(n) {
  let arr = [];
  for (let i = 0; i < n + 1; i++) {
    arr[i] = 1 / (i + 1);
    for (let j = i; j > 0; j--) {
      arr[j-1] = j * (arr[j-1] - arr[j])
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

console.log(calcBernoulliNum(4))