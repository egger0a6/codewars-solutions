// Solution for 6kyu Kata "Pattern Christmas Tree" https://www.codewars.com/kata/56e8f0d5b131af66ec00018e

function draw(n){
  const space = " ";
  const dblSpace = "　";
  const even = n % 2 === 0;

  let tree = `${even ? dblSpace.repeat(n/2 + 1) : space + dblSpace.repeat(n/2 + 1)}●\n`;

  let j = n - 1;
  for (let i = 1; i <= n; i++) {
    let padding = (j % 2 === 0) ? dblSpace.repeat(j/2) : space + dblSpace.repeat(j/2);
    tree += `${padding}.◢${"█".repeat(i)}◣.\n`;
    j--;
  }

  let bottom = even ? n / 2 : (n + 1) / 2;
  tree += `${even ? "　" : " "}${"︸".repeat(bottom)}█${"︸".repeat(bottom)}`;

  return tree;
}