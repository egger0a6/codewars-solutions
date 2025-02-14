// Solution for 7kyu Kata "Roasting Chicken" https://www.codewars.com/kata/59ff57d3c9fc0e0e95000061

function cookingTime(weight){
  if (!weight) return "There is no chicken!";
  
  weight = weight * 1000;

  let minutes = (weight / 450) * 20 + 20;
  minutes = Math.ceil(minutes / 5) * 5;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return `${hours ? `${hours} hr${hours > 1 ? "s" : ""}` : ""}${hours && minutes ? " " : ""}${minutes ? `${minutes} mins` : ""}`;
}