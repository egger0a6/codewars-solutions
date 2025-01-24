// Solution for 6kyu Kata "Santa's Missing Gift List" https://www.codewars.com/kata/5665d30b3ea3d84a2c000025

function gifts(number) {
  const gifts = {
    1: 'Toy Soldier',
    2: 'Wooden Train',
    4: 'Hoop',
    8: 'Chess Board',
    16: 'Horse',
    32: 'Teddy',
    64: 'Lego',
    128: 'Football',
    256: 'Doll',
    512: "Rubik's Cube"
  }

  let vals = Object.keys(gifts);
  let list = [];

  while (number > 0) {
    for (let i = vals.length - 1; i >= 0; i--) {
      if (vals[i] <= number) {
        list.unshift(gifts[vals[i]]);
        number -= vals[i];
        vals = vals.slice(0, i);
        break;
      }
    }
  }

  return list.sort();
}