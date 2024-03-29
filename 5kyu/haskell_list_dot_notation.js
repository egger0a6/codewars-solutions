// Solution for 5kyu Kata https://www.codewars.com/kata/53c8b29750fe70e4a2000610

function ArrayComprehension({generator = ""}) {
  if (!generator) return [];
  let regex = /(-?\d+)\.\.(-?\d+)|(-?\d+),(-?\d+)\.\.(-?\d+)/;
  let options = generator.match(regex);
  if (options) {
    let array = [];
    options = options.map(Number).filter(x => !isNaN(x));
    let start, step, end;
    if (options.length === 2)  {
      [start, end] = options;
      if (start > end) return array;
      step = 1;
    }
    else {
      [start, step, end] = options;
      step = step - start;
    }

    if (start < end) {
      for (let i = start; i <= end; i += step) {
        array.push(i);
      }
    }
    else {
      for (let i = start; i >= end; i += step) {
        array.push(i);
      }
    }

    return array;
  }
  else {
    return JSON.parse(`[${generator}]`);
  }
}