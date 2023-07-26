function ArrayComprehension({generator = "", filters = [], transform = ""}) {
  if (!generator) return [];
  let regex = /(-?\d+)\.\.(-?\d+)|(-?\d+),(-?\d+)\.\.(-?\d+)/;
  let options = generator.match(regex);
  let array;
  if (options) {
    array = [];
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

  }
  else {
    array = JSON.parse(`[${generator}]`);
  }

  if (filters) {
    filters.forEach(filter => {
      array = array.filter(x => filter(x));
    });
  }

  if (transform) {
    array = array.map(x => transform(x));
  }

  return array;
}