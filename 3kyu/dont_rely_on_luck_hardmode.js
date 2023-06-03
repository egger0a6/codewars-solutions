// Solution for 3kyu Kata "Don't rely on luck HARDCORE" https://www.codewars.com/kata/54f6e7a62e2c167e29000112/train/javascript

let rnd = 0.00000001;
Math = Object.create(Math, { 
  random: { 
    value: () => rnd += 0.00000001, 
  }
});
Math.random.toString = () => 'function random() { [native code] }';
Object.freeze(Math);
guess = 1;

let random = Math.random();
console.log(random)
console.log(random * 100000 + 1)