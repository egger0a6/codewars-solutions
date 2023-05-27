// Solution for 4kyu Kata https://www.codewars.com/kata/52ec24228a515e620b0005ef/train/javascript

function sum(num) {
  num = BigInt(num);
  let genPentNum = (k) => BigInt((k*(3n*k-1n)) / 2n);

  let partitions = [1n];
  for (let i = 1n; i <= num; i++) {
    partitions.push(0n);
    for (let j = 1n; j <= i; j++) {
      let coeff = (-1n) ** (j + 1n);
      for (const el of [genPentNum(j), genPentNum(-j)]) {
        if (i - el >= 0n) {
          partitions[i] = partitions[i] + coeff*partitions[i-el];
        }
      }
    }
  }
  return partitions[num];
}

console.log(sum(4))
console.log(sum(10))
console.log(sum(100))