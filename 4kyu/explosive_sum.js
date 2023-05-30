// Solution for 4kyu Kata https://www.codewars.com/kata/52ec24228a515e620b0005ef/train/javascript

function sum(num) {
  num = BigInt(num);
  let genPentNum = (k) => BigInt((k*(3n*k-1n)) / 2n);

  let partitions = [1n];
  for (let i = 1n; i <= num; i++) {
    partitions.push(0n);
    console.log("i: " + i)
    for (let j = 1n; j <= i; j++) {
      console.log()
      console.log("j: " + j)
      let coeff = (-1n) ** (j + 1n);
      console.log("coeff " + coeff)
      console.log("partitons " + partitions)
      console.log([genPentNum(j), genPentNum(-j)])
      let pentNumPos = i - genPentNum(j);
      let pentNumNeg = i - genPentNum(-j);
      if (pentNumPos < 0 || pentNumNeg < 0) break;
      for (const pNum of [pentNumPos, pentNumNeg]) {
        console.log("i-Pnum = " + (i - pNum))
        if (pNum >= 0n) {
          partitions[i] = partitions[i] + coeff*partitions[pNum];
          //console.log(partitions)
        }
      }
    }
    console.log()
  }
  return partitions[num];
}

// console.log(sum(4))
console.log(sum(10))
// console.log(sum(100))