// Solution for 7kyu Kata "Santa's Naughty List" https://www.codewars.com/kata/5a0b4dc2ffe75f72f70000ef

function findChildren(santasList, children) {
  return children
  .filter((c, idx) => santasList.includes(c) && children.indexOf(c) === idx)
  .sort();
}