// solution for 4kyu Kata "Range Extraction" https://www.codewars.com/kata/51ba717bb08c1cd60f00002f/train/javascript

function solution(list){
  let rangeList = [];

  while (list.length) {
    let start = list.length - 1;
    let end = start;
    let currLen = 0;
    while (list[end] - 1 === list[end-1]) {
      currLen++;
      end--;
    }
    if (currLen > 1) {
      rangeList.push(`${list[end]}-${list[start]}`);
      list = list.slice(0, end);
    }
    else {
      for (let i = start; i >= end; i--) {
        rangeList.push(list[i]);
      }
      list = list.slice(0, end);
    }
    console.log(rangeList)
    console.log(list)
  }
  return rangeList.reverse().join(",");
}

console.log(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]));
// "-6,-3-1,3-5,7-11,14,15,17-20"