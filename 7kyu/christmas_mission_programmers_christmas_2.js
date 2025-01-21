// Solution for 7kyu Kata "Christmas mission: Programmer's Christmas #2" https://www.codewars.com/kata/58523d715e8c052521000084

function merryChristmas(s1,s2){
  const chars = ["M", "e", "r", "r", "y", " ", "C", "h", "r", "i", "s", "t", "m", "a", "s", "!"];

  while (s2) {
    let c = s2[0];
    s2 = s2.slice(1);
    s1 = s1.includes(c) ? s1.replace(c, "") : s1 + c;
  }

  for (const char of chars) {
    if (s1.includes(char)) {
      s1 = s1.replace(char, "")
    }
  }

  return !s1;
}