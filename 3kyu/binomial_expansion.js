// Solution for 3kyu Kata "Binomial Expansion" https://www.codewars.com/kata/540d0fdd3b6532e5c3000b5b/train/javascript

function expand(expr) {
  expr = expr.split(/\^(?!.*\^)/);
  console.log(expr)
  if (+expr[1]) {
    let exp = [];
    for (let i = 0; i < +expr[1]; i++) {
      exp = [...exp, expr[0].replace(/[()]/g, "")];
    }
    console.log(exp)
    exp = exp.reduce((prev, curr) => {
      let binomial = "";
      prev = prev.split(/(-?[0-9]*[a-z]*[\^0-9]*)/g).filter(term => term && term != "+");
      curr = curr.split(/(-?[0-9]*[a-z]*[\^0-9]*)/g).filter(term => term && term != "+");
      console.log(prev)
      console.log(curr)
      for (i of curr) {
        for (j of prev) {
          let iPow = "";
          let jPow = "";
          let iTerms = i.split(/([0-9]+|\^)/).filter(term => term);
          let jTerms = j.split(/([0-9]+|\^)/).filter(term => term);
        }
      }
    }, "");
  }
  else {
    return "1";
  }
}


function calcBinomial(binA, binB) {
  //TODO
}


function simplifyBinomial(bin) {
  //TODO
}


// expand("(144t^2-1032t+1849)^1")
// expand("(64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096)^2")


//------------------------------------------------------------------------------


// Binomial Theorem method (*Working Solution*)

function binomialTheorem(expr) {
  let binomExpan = "";
  expr = expr.split(/\^(?!.*\^)/);
  let n = +expr[1];
  if (!n) return "1";
  expr = expr[0]
  .replace(/[()]/g, "")
  .split(/(-?[0-9]*[a-z]*[\^0-9]*)/g).filter(term => term && term != "+");

  let a = expr[0];
  let b = expr[1];
  for (let k = 0; k < n + 1; k++) {
    let currExpr = "";
    let currA;
    let currB;

    // calculate the Binomial Coefficient
    let coeff = binomialCoeff(n, k);

    // calculate b^k
    currB = Math.pow(+b, k);

    // calculate a^(n-k) and combined coefficient
    let exponent = n - k;
    currA = a.split(/(-?)([0-9]*)([a-z]?)/).filter(term => term);
    switch (currA.length) {
      case 3:
        coeff = coeff * currB * Math.pow(-currA[1], exponent);
        if (coeff === 0) break;
        currExpr += 
        `${handleCoeff(coeff, binomExpan, exponent)}` +
        `${(exponent >= 1) ? currA[2] : ""}` +
        `${(exponent > 1) ? "^"+exponent : ""}`;
        binomExpan += currExpr;
        break;
      case 2:
        if (+currA[0]) {
          coeff = coeff * currB * Math.pow(+currA[0], exponent);
          if (coeff === 0) break;
        }
        else {
          coeff = coeff * currB * Math.pow(-1, exponent);
          if (coeff === 0) break;
        }
        currExpr += 
        `${handleCoeff(coeff, binomExpan, exponent)}` +
        `${(exponent >= 1) ? currA[1] : ""}` +
        `${(exponent > 1) ? "^"+exponent : ""}`;
        binomExpan += currExpr;
        break;
      default:
        coeff = coeff * currB;
        if (coeff === 0) break;
        currExpr += 
        `${handleCoeff(coeff, binomExpan, exponent)}` +
        `${(exponent >= 1) ? currA[0] : ""}` +
        `${(exponent > 1) ? "^"+exponent : ""}`;
        binomExpan += currExpr;
        break;
    }
  }
  return binomExpan;
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

function handleCoeff(coeff, binomExpan, exponent) {
  if (binomExpan) {
    if (exponent) {
      return (coeff > 1) ? "+"+coeff : (coeff < -1) ? coeff : (coeff === -1) ? "-" : "";
    }
    else {
      return (coeff > 0) ? "+"+coeff : (coeff < 0) ? coeff : "";
    }
  }
  else {
    return (coeff === 1) ? "" : (coeff === -1) ? "-" : coeff;
  } 
}

binomialTheorem("(-x-1)^2");
binomialTheorem("(-12t+43)^2");
binomialTheorem("(x+1)^2");
console.log(binomialTheorem("(x-1)^0"));
console.log(binomialTheorem("(x-1)^1"));
console.log(binomialTheorem("(x-1)^2"));
console.log(binomialTheorem("(5m+3)^4"));
console.log(binomialTheorem("(2x-3)^3"));
console.log(binomialTheorem("(7x-7)^0"));
console.log(binomialTheorem("(-5m+3)^4"));
console.log(binomialTheorem("(-2x-3)^3"));
console.log(binomialTheorem("(-7x-7)^0"));
console.log(binomialTheorem("(-n-12)^5"));
console.log(binomialTheorem("(9t-0)^2"));