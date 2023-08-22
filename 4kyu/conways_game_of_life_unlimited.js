// Solution for 4kyu Kata "Conway's Game of Life - Unlimited Edition https://www.codewars.com/kata/52423db9add6f6fc39000354/train/javascript"

const NEIGHBOURS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

function getGeneration(cells, generations){
  let newCells = JSON.parse(JSON.stringify(cells));
  let gen = 0;
  while (gen < generations) {
    addBorders(newCells);
    let aliveCells = [];
    for (let i = 0; i < newCells.length; i++) {
      for (let j = 0; j < newCells[0].length; j++) {
        let currCell = newCells[i][j];
        let nCount = 0;
        for (const n of NEIGHBOURS) {
          if (getCell(i+n[0], j+n[1], newCells)) {
            nCount++;
          }
        }
        if (determineState(nCount, currCell)) {
          aliveCells.push([i, j]);
        }
      }
    }
    newCells = generateUniverse(aliveCells);
    gen++;
  }
  return newCells;
}

// function to implement the rules of life on a single cell.
// returns boolean to determine if cell is alive or not based on the number of
// neighbors, nCount.
function determineState(nCount, cell) {
  if (cell) {
    if (nCount < 2) {
      return false;
    }
    else if (nCount > 3) {
      return false;
    }
    else {
      return true;
    }
  }
  else {
    if (nCount === 3) {
      return true
    }
  }
  return false;
}

// function to generate universe for the next generation
function generateUniverse(aliveCells) {
  let maxRow = 0, maxCol = 0, minRow = Number.MAX_VALUE, 
  minCol = Number.MAX_VALUE;
  let nextGenCells = [];
  for (const cell of aliveCells) {
    maxRow = Math.max(maxRow, cell[0]);
    minRow = Math.min(minRow, cell[0]);
    maxCol = Math.max(maxCol, cell[1]);
    minCol = Math.min(minCol, cell[1]);
  }
  for (let i = minRow; i < maxRow + 1; i++) {
    row = new Array(maxCol - minCol + 1).fill(0);
    nextGenCells.push(row);
  }
  for (const cell of aliveCells) {
    nextGenCells[cell[0]-minRow][cell[1]-minCol] = 1;
  }
  return nextGenCells;
}

// adds +1 dead cells to each border of the universe 
function addBorders(cells) {
  for (const row of cells) {
    row.unshift(0);
    row.push(0);
  }
  cells.unshift(new Array(cells[0].length).fill(0));
  cells.push(new Array(cells[0].length).fill(0));
}

// function that returns cell at (i, j) or false if out of bounds
function getCell(i, j, cells) {
  let rowLen = cells.length;
  let colLen = cells[0].length;
  if (i < 0 || i >= rowLen || j < 0 || j >= colLen) {
    return false;
  }
  return cells[i][j];
}