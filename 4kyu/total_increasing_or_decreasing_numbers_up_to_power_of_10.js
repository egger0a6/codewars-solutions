// Solution for 4kyu Kata https://www.codewars.com/kata/55b195a69a6cc409ba000053/train/javascript

// This is a combinatorics problem that can be solved with "stars and bars" method.
// There are 10 options to chose from (0-9), with a "bar" separating each position 
// that a "star" (digit) can be placed. For example, |*|||**||||| results in 144.

// For the total increasing numbers it is a combination problem where order doesn't 
// matter and replacements are allowed. This can be written as (x + n -1) choose (n - 1) 
// where n is the number of items to choose from (bars) and x is the amount chosen (stars/digits). 
// i.e. for total increasing or decreasing under 10^3, x = 3 because all numbers 
// less than 10^3 are in 000-999. This would be written as (3 + 10 -1) choose (10 - 1).

// For the total decreasing, there needs to be an extra 0 position to account for leading
// zeros. In this case n = 11, written as (x + 11 - 1) choose (11 - 1).

// By just adding the total increasing and decreasing numbers, numbers that contain all
// the same digits like 2, 33, 444, xxx...x, are counted twice. These numbers appear 
// x * n times in either the increasing or decreasing totals, so (x*n) is subtracted
// once from the combined total.

// Because zero is considered non-bouncy for this kata, 1 is subtracted from the total.
// Zero(s) appear 3 times in total i.e. for x = 4, 0000 is accounted for in the total
// increasing, then two more times in the total decreasing since n = 11. By subtracting
// 1 from the total inc., and (10 * n) from the combined total, 2 of the 3 instances 
// of all zeros are removed. 

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