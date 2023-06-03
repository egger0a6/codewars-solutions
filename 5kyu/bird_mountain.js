// Solution for 5kyu Kata "Bird Mountain" https://www.codewars.com/kata/5c09ccc9b48e912946000157/train/javascript

var peakHeight = function(mountain) {
  let width = mountain[0].length;
  let flatMountain = [];
  for (m of mountain) {
    flatMountain = [...flatMountain, ...m];
  }
  console.log(flatMountain)

  let validIdxs = [];
  for (let i = 0; i < flatMountain.length; i++) {
    if (flatMountain[i] === "^") {
      validIdxs.push(i);
    }
  }
  console.log(validIdxs)

  let height = 0;
  while(validIdxs.length) {
    let toBeRemoved = [];
    for (validIdx of validIdxs) {
      if (!checkNeighbors(validIdx, flatMountain, width)) {
        toBeRemoved.push(validIdx);
      }
    }

    for (validIdx of toBeRemoved) {
      let idx = validIdxs.indexOf(validIdx);
      validIdxs.splice(idx, 1);
      flatMountain.splice(validIdx, 1, 0);
    }

    height++;
  }
  console.log(height)
  return height;
}

function checkNeighbors(idx, pixels, width) {
  let maxRowIdx = (idx + width) - (idx % width);
  let minRowIdx = idx - (idx % width);
  if ((idx + 1 < maxRowIdx && pixels[idx] === pixels[idx + 1]) &&
      (idx - 1 >= minRowIdx && pixels[idx] === pixels[idx - 1]) &&
      (idx - width >= 0 && pixels[idx - width] === pixels[idx]) &&
      (idx + width < pixels.length && pixels[idx + width] === pixels[idx])) {
      return true;
  }
  return false;
}



let mountain = [
  [
    '^', '^', '^', '^',
    '^', '^', ' ', ' ',
    ' ', ' ', ' ', ' ',
    ' ', ' '
  ],
  [
    ' ', '^', '^', '^',
    '^', '^', '^', '^',
    '^', ' ', ' ', ' ',
    ' ', ' '
  ],
  [
    ' ', ' ', '^', '^',
    '^', '^', '^', '^',
    '^', ' ', ' ', ' ',
    ' ', ' '
  ],
  [
    ' ', ' ', '^', '^',
    '^', '^', '^', ' ',
    ' ', ' ', ' ', ' ',
    ' ', ' '
  ],
  [
    ' ', ' ', '^', '^',
    '^', '^', '^', '^',
    '^', '^', '^', '^',
    '^', ' '
  ],
  [
    ' ', ' ', '^', '^',
    '^', '^', '^', '^',
    ' ', ' ', ' ', ' ',
    ' ', ' '
  ],
  [
    ' ', ' ', '^', '^',
    '^', '^', ' ', ' ',
    ' ', ' ', ' ', ' ',
    ' ', ' '
  ]
]

peakHeight(mountain);

[ 
  '^', '^', '^', '^', '^', '^', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 
  ' ', '^', '^', '^', '^', '^', '^', '^', '^', ' ', ' ', ' ', ' ', ' ', 
  ' ', ' ', '^', '^', '^', '^', '^', '^', '^', ' ', ' ', ' ', ' ', ' ', 
  ' ', ' ', '^', '^', '^', '^', '^', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 
  ' ', ' ', '^', '^', '^', '^', '^', '^', '^', '^', '^', '^', '^', ' ', 
  ' ', ' ', '^', '^', '^', '^', '^', '^', ' ', ' ', ' ', ' ', ' ', ' ', 
  ' ', ' ', '^', '^', '^', '^', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
]