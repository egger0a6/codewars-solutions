// Solution for 4kyu Kata https://www.codewars.com/kata/55b195a69a6cc409ba000053/train/javascript

function totalIncDec(x){
  x = BigInt(x);
  let n = 10n;
  let inc = binomCoeff(x + n - 1n, n - 1n) - 1n;
  let dec = binomCoeff(x + n, n);

  return inc + dec - n * x;
}


// calc binomial coefficient (n choose k)
function binomCoeff(n, k) {
  let coeff = 1n;

  for (let i = 0n; i < k; i++) {
    coeff *= n - i;
    coeff /= i + 1n;
  }

  return coeff;
}