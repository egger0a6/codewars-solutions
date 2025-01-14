// Solution for 6kyu Kata "Christmas mission: Distribute gifts #2" https://www.codewars.com/kata/584f6da5ddf34867fc000048

function distributeGifts(wishes){
  let totPresents = 0;

  // sort wishes by difference in each childs minimum and maximum wishes, ascending.
  wishes = wishes.sort((a, b) => {
    a = a[1] - a[0];
    b = b[1] - b[0];
    return a - b;
  });
  
  // add the maximum wishes of the children with the smallest difference
  for (let i = 0; i < wishes.length / 2; i++) {
    totPresents += wishes[i][1];
  }
  
  // add the minimum wishes of the children with the largest difference
  for (let i = wishes.length / 2; i < wishes.length; i++) {
    totPresents += wishes[i][0];
  }

  return totPresents;
}