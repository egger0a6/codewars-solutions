// Solution for 4kyu Kata https://www.codewars.com/kata/52ec24228a515e620b0005ef/train/javascript

// let recurrArr = [];
// let gKNums = new Map();

function sum(num) {
  num = BigInt(num);
  let genPentNum = (k) => BigInt((k*(3n*k-1n)) / 2n);

  let partitions = [1n];
  for (let n = 1n; n <= num; n++) {
    partitions.push(0n);
    let k = 1n;
    let posK = n - genPentNum(k);
    let negK = n - genPentNum(-k);
    while (!(posK < 0 && negK < 0)) {
      let coeff = (-1n) ** (k + 1n);
      for (const m of [posK, negK]) {
        if (m >= 0n) {
          partitions[n] = partitions[n] + coeff*partitions[m];
        }
        //console.log(partitions)
      }
      ++k
      posK = n - genPentNum(k);
      negK = n - genPentNum(-(k));
    }
  }
  return partitions[num];
}

console.log(sum(4))
console.log(sum(10))
console.log(sum(100))