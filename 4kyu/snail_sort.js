// solution for code wars 4kyu Kata "Snail Sort" https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/javascript

snail = function(array) {
  let indecesArr = []
  let n = array[0].length;
  let dir = "right";
  let inIdx = 0;
  let outIdx = 0;
  
  for (let i = 0; i < (array[0].length * 2) - 1; i++) {
    for (let j = 0; j < n; j++) {
      indecesArr.push(array[outIdx][inIdx]);
      switch(dir) {
        case "right":
          inIdx++;
          break;
        case "down":
          outIdx++;
          break;
        case "left":
          inIdx--;
          break;
        case "up":
          outIdx--;
          break;
        default:
          break;
      }
    }
    if (i % 2 === 0) n--;
    switch(dir) {
      case "right":
        inIdx--;
        outIdx++;
        dir = "down";
        break;
      case "down":
        inIdx--;
        outIdx--;
        dir = "left";
        break;
      case "left":
        inIdx++;
        outIdx--;
        dir = "up";
        break;
      case "up":
        inIdx++;
        outIdx++
        dir = "right";
        break;
      default:
        break;
    }
  }
  return indecesArr;
}
snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]])