// Solution for 7kyu Kata "A Gift Well Spent" https://www.codewars.com/kata/54554846126a002d5b000854

var buy = function(x, arr){
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === x) return [i, j];
    }
  }

  return null;
};