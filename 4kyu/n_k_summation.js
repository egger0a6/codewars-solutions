// Solution to 4kyu Kata "n^k summation" https://www.codewars.com/kata/53e57dada0cb0400ba000688/train/javascript

// method using Faulhaber's formula https://www.wikiwand.com/en/Faulhaber%27s_formula

// memoization for previously calculated Bernoulli numbers and GCD of pairs
let BernoulliNums = new Map(),
    gcdPairs = {};

var equation = function (exp) {
  let coeff = [1, BigInt(exp + 1)], // 1 / (p + 1)
      expandedFormula = "",
      binomCoeff, 
      bernNum,
      expon;

  let currExpr,
      currCoeff,
      num,
      den;
  for (let k = 0; k < exp+1; k++) {
    currExpr = "";

    if (BernoulliNums.has(k)) {
      bernNum = BernoulliNums.get(k);
    }
    else {
      bernNum = reduceFrac(calcBernoulliNumFrac(k));
    }
    if (!bernNum[0]) continue;

    binomCoeff = [binomialCoeff(exp+1, k), coeff[1]];
    currCoeff = reduceFrac([binomCoeff[0] * bernNum[0], binomCoeff[1] * bernNum[1]]);
    num = currCoeff[0];
    den = currCoeff[1];
    expon = exp - k + 1;
    if (expandedFormula) {
      currExpr += 
      `${(num < 0 || den < 0) ? " - " : " + "}` +
      `${(den === 1n) ? num : num + "/" + den}`.replace("-", "") +
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
    expandedFormula += currExpr;
  }
  return expandedFormula;
}

// Binary GCD algorithm iterative https://www.wikiwand.com/en/Binary_GCD_algorithm
function binaryGcdIter(n, m) {
  let commonFactorsTwo = 0n;
  while (n && m) {
    if (n&1n) {
      if (m&1n) {
        if (n >= m) {
          n = n - m;
        }
        else {
          m = m - n;
        }
      }
      else {
        m = m >> 1n;
      }
    }
    else if (m&1n) {
      n = n >> 1n;
    }
    else {
      commonFactorsTwo += 1n;
      n = n >> 1n;
      m = m >> 1n;
    }
  }

  return (n || m) << commonFactorsTwo;
}

function calcBernoulliNumFrac(n) {
  let arr = [];
  let bernNum;
  for (let i = 0; i < n + 1; i++) {
    // index 0 = numerator, 1 = denominator
    arr[i] = [BigInt(1), BigInt(i + 1)];
    let diff;
    for (let j = i; j > 0; j--) {
      diff = subFrac(arr[j-1], arr[j]);
      arr[j-1] = [BigInt(j) * diff[0], diff[1]];
    }
  }
  bernNum = reduceFrac(arr[0]);
  BernoulliNums.set(n, bernNum);
  return bernNum;
}

function binomialCoeff(n, k) {
  n = BigInt(n);
  k = BigInt(k);
  let coeff = 1n;

  if (k > n - k) {
    k = n - k;
  }

  for (let i = 0n; i < k; i++) {
    coeff *= n - i;
    coeff /= i + 1n;
  }

  return coeff;
}

// absolute value of n
let abs = (n) => (n < 0n) ? (-1n)*n : n;

// subtract two fractions
function subFrac(fOne, fTwo) {
  let diff = [];
  let gcd = binaryGcdIter(abs(fOne[1]), abs(fTwo[1]));
  if (fOne[1] < 0n || fTwo[1] < 0n) gcd *= -1n;
  // frac1 + (-)frac2
  diff.push((fOne[0] * fTwo[1] / gcd) + ((BigInt(-1)*fTwo[0]) * fOne[1] / gcd));
  diff.push(fOne[1] * fTwo[1] / gcd);
  return diff;
}

// reduce a fraction by dividing numerator and denominator by thier GCD
function reduceFrac(frac) {
  let gcd = binaryGcdIter(abs(frac[0]), abs(frac[1]));
  if (frac[0] < 0n || frac[1] < 0n) gcd *= -1n;
  return [frac[0] / gcd, frac[1]/ gcd];
}


// deprecated
// function binomialCoeff(n, k) {
//   n = BigInt(n);
//   k = BigInt(k);
//   let coeff = BigInt(1);
//   for (let i = n - k + BigInt(1); i <= n; i++) {
//     coeff *= i;
//   }
//   for (i = BigInt(1); i <= k; i++) {
//     coeff /= i;
//   }
//   return coeff;
// }

// deprecated - too slow
// Euclidian algorithm
// function calcGcd(a, b) {
//   return b ? calcGcd(b, a % b) : a;
// }

// deprecated
// function calcBernoulliNum(n) {
//   let arr = [];
//   for (let i = 0; i < n + 1; i++) {
//     arr[i] = 1 / (i + 1);
//     for (let j = i; j > 0; j--) {
//       arr[j-1] = j * (arr[j-1] - arr[j])
//     }
//   }
//   return arr[0];
// }

// deprecated
// Binary GCD algorithm recursive 
// function binaryGcd(n, m) {
//   if (!n || !m) return n + m;
//   if (!n&1 && !m&1) {
//     return binaryGcd(n >> 1, m >> 1) << 1;
//   }
//   else if (!n&1) {
//     return binaryGcd(n >> 1, m);
//   }
//   else if(!m&1) {
//     return binaryGcd(n, m << 1);
//   }
//   else {
//     return binaryGcd()
//   }
// }

console.log(equation(0))
console.log(equation(1))
console.log(equation(2))
console.log(equation(4))
console.log(equation(5))
console.log(equation(6) + "\n")
console.log(equation(7) + "\n")
console.log(equation(9) + "\n")
console.log(equation(24) + "\n")
console.log(equation(26))
// console.log(equation(140))

// TODO make algorithm faster. Try saving previously calculated Bernoulli numbers in a Map,
// TODO or previously calculated gcd pairs in a object / map