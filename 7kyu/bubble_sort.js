// Solution for 7kyu Kata "Bubble Sort" https://www.codewars.com/kata/57403b5ad67e87b5e7000d1d

function bubble(arr) {
  let n = arr.length;
  let snapshot = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (arr[j+1] < arr[j]) {
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
        let tempArr = [...arr];
        snapshot = [...snapshot, tempArr];
      }
    }
  }

  return snapshot;
}