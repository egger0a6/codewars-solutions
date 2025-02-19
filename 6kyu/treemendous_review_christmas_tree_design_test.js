// Solution for 6kyu Kata "🎄 Tree-mendous Review: Christmas Tree Design Test" https://www.codewars.com/kata/6755c1a3d344978ab24c7e99

function review(height, ornaments, tree) {
  let points = 10;
  
  // score ornaments criteria
  if ((ornaments === "yes" && !/o/.test(tree)) || (ornaments === "no") && /o/.test(tree)) {
    points -= 5;
  }

  let ornamentNum = tree.match(/o/g) ? tree.match(/o/g).length : 0;
  tree = tree.split("\n");
  let width = tree[0].length;
  let trunk = (/[|]/.test(tree[tree.length-1])) ? tree.pop() : "";

  // score height criteria
  if (tree.length === height + 1 || tree.length === height - 1) {
    points -= 1;
  } else if (tree.length >= height + 2 || tree.length <= height - 2)  {
    points -= 2;
  }

  // score centered criteria
  let space = Math.floor(width / 2);
  for (let i = 0; i < tree.length; i++) {
    let left = width - tree[i].trimStart().length;
    let right = width - tree[i].trimEnd().length;
    if (left !== space || right !== space) {
      points -= 1;
      break;
    }
    space--;
  }

  // score trunk
  if (trunk) {
    if (!(trunk.indexOf("|") === Math.floor(width / 2))) {
      points -= 1;
    }
  } else {
    points -= 2;
  }

  //score bonus points
  if (points < 6 && ornaments === "no" && /o/.test(tree[0]) && ornamentNum === 1) {
    points += 3;
  }

  return points;
}