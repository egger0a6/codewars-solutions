// Solution for 3kyu Kata "Last Digit of a Huge Number" https://www.codewars.com/kata/5518a860a73e708c0a000027/train/javascript

function lastDigit(arr){
  if (arr.length === 0) return 1;
  if (arr.length === 1) return arr[0] % 10;
  let temp;
  let curr = arr[arr.length - 2];
  let prev = arr[arr.length - 1];
  if (prev === 0) temp = 1;
  else if (prev === 1) temp = curr;
  else temp = Math.pow(curr < 20 ? curr : (curr % 20 + 20), prev < 4 ? prev : (prev % 4 + 4));
  arr = [...(arr.slice(0, arr.length - 2)), temp];
  return lastDigit(arr);
}