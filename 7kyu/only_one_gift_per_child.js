// Solution for 7kyu Kata "Only One Gift Per Child" https://www.codewars.com/kata/52af0d380fcae83a560008af

const children = {};

function handOutGift(name) {
  if (name in children) {
    throw new Error("Naughty Child");
  } else {
    children[name] = true;
  }
}