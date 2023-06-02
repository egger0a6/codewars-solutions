function ArrayComprehension(options) {
  let array;
  console.log(options.generator)
  let regex = /(^-*\d*(?:,*-*\d*)*)|([.][.])/;
  // options = options.generator.matchAll(regex);
  // for (const match of options) {
  //   console.log(match)
  //   console.log()
  // }
  options = options.generator.split(regex).filter(term => term);
  console.log(options)
  return [];
}

console.log(ArrayComprehension({generator: '1,4,-3'}))
console.log(ArrayComprehension({generator: ""}))
console.log(ArrayComprehension({generator: "1"}))
console.log(ArrayComprehension({generator: "1,3..7"}))