// Solution for 6kyu Kata "Christmas Present Calculator" https://www.codewars.com/kata/585355fb0877c420a2000009

function merryChristmas(s) {
  s = s.replace(/[^a-zA-Z]|\s/g, "");
  const chars = ["M", "e", "r", "r", "y", "C", "h", "r", "i", "s", "t", "m", "a", "s"];
  const regex = /[MeryChistma]/g;

  let pairCount = 0;

  while (regex.test(s)) {
    let includesChar = true;
    for (const char of chars) {
      if (s.includes(char)) {
        s = s.replace(char, "");
      } else {
        includesChar = false;
      }
    }

    if (includesChar) pairCount++;
  }

  return pairCount;
}