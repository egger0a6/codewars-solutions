// Solution to 4kyu Kata "Tower Defense: Risk Analysis" https://www.codewars.com/kata/5a57faad880385f3b60000d0/train/javascript


const PATH = [];

function towerDefense(grid,turrets,aliens){
	setup(grid, turrets);
}


// first pass through the grid to setup data structures
function setup(grid, turrets) {
  const N = grid.length;
  grid = grid.reduce((prev, curr) => prev + curr, "");
  let start = grid.indexOf("0");
  // find grid path and store in global array PATH
  getPath(grid, start, N);
  // find indeces of all turrets
  for (let i = 0; i < grid.length; i++) {
    let currChar = grid.at(i);
    if (/[A-Z]/.test(currChar)) {
      turrets[currChar].push(i);
      getTurretTargets(currChar, turrets, N);
    }
  }
  console.log(PATH)
  console.log(turrets)
}

function mainLoop(turrets, aliens) {

}

// get indexes of path. grid is now a single string reduced from the original
// nested array.
function getPath(grid, start, N) {
  PATH.push(start);
  let hasNeighbor = true, prevIdx = start, curIdx = start, n, s, e, w;
  let foundPath = new Set();
  while (hasNeighbor) {
    n = (curIdx - N > 0) ? curIdx - N : null;
    s = (curIdx + N <= grid.length - 1) ? curIdx + N : null;
    e = ((curIdx % N) + 1 < N) ? curIdx + 1 : null;
    w = ((curIdx % N) - 1 >= 0) ? curIdx - 1 : null;

    prevIdx = curIdx;
    for (const idx of [n, s, e, w]) {
      if (idx && grid[idx] === "1" && !foundPath.has(idx)) {
        PATH.push(idx);
        foundPath.add(idx);
        curIdx = idx;
        break;
      }
    }
    if (prevIdx === curIdx) {
      hasNeighbor = false;
    }
  }
  // PATH.sort((a, b) => a - b);
}

// calculate the path indices that are in range of the turret param, t
function getTurretTargets(t, turrets, N) {
  let tPos = turrets[t][2], tRange = turrets[t][0];
  let tRow = Math.floor(tPos / N), tCol = tPos % N, pRow, pCol, distance;
  let tTargets = [];
  for (const pos of PATH) {
    pRow = Math.floor(pos / N);
    pCol = pos % N;
    distance = Math.abs(pRow - tRow) + Math.abs(pCol - tCol);
    if (distance <= tRange) {
      tTargets.push(pos)
    }
  }
  turrets[t] = [turrets[t], tTargets.reverse()];
}