function ArrayComprehension(options) {
  if (!options.generator) return [];
  console.log()
  let array;
  console.log(options.generator)
  let regex = /(\.\.)/;
  // let regex = /(^-*\d*(?:,*-*\d*)*)|(\.\.)/;
  options = options.generator.split(regex);
  console.log(options)
  if (options.includes("..")) {
    if (options.length > 3) {
      array = [];
    }
    else {
      let start = options[0].split(",");
      let end = options[2].split(",");
      console.log(start)
      console.log(end)
      if (start.length > 2 || end.length > 1) {
        array = [];
      }
      else {
        let step = (start.length > 1) ? +start[1] - +start[0]: 1;
        console.log(step)
        start = +start[0];
        end = +end[0];
        console.log(start)
        console.log(end)
        array = [];
        if (start < end) {
          for (let i = start; i <= end; i += step) {
            array.push(i);
          }
        }
        else  {
          if (step == 1) {
            return array;
          }
          for (let i = start; i >= end; i += step) {
            array.push(i);
          }
        }
      }
    }
  }
  else {
    array = options.length ? options[0].replaceAll(" ", "").split(",").filter(el => el).map(el => +el) : [];
  }
  return array;
} 

console.log(ArrayComprehension({generator: ""}))
console.log(ArrayComprehension({generator: "1"}))
console.log(ArrayComprehension({generator: '2,3,-5,3'}))
console.log(ArrayComprehension({generator: "1,3..7"}))
console.log(ArrayComprehension({generator: "1..5"}))
console.log(ArrayComprehension({generator: "6,5..3"}))
console.log(ArrayComprehension({generator: "6,4..0"}))
console.log(ArrayComprehension({generator: "5..3"}))
console.log(ArrayComprehension({generator: "10,1..10"}))
// console.log(ArrayComprehension({generator: "1,1..10"}))
console.log(ArrayComprehension({generator: "1..9,12..15"}))
console.log(ArrayComprehension({generator: "1,2..20,25"}))
console.log(ArrayComprehension({generator: "1,2,3..20"}))