// Solution to 4kyu Kata "Tower Defense: Risk Analysis" https://www.codewars.com/kata/5a57faad880385f3b60000d0/train/javascript


let PATH = [];

function towerDefense(grid,turrets,aliens){
  PATH = [];
	setup(grid, turrets);
  return mainLoop(turrets, aliens);
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
}

function mainLoop(turrets, aliens) {
  let state = new Array(PATH.length).fill(0), totAliens = aliens.length;
  let totHealthPoints = 0, totalShots = 0;

  // calculate total shots available per turn
  for (const turret in turrets) {
    totalShots += turrets[turret].totShots;
  }

  // one iteration of outer while loop constitutes one move
  state[0] = aliens.shift();
  while (true) {
    while (true) {
      let totShotsFired = 0;

      // during a move, loop through all turrets
      let currShotsFired = 0;
      for (const turret in turrets) {
        if (!turrets[turret].remShots) {
          continue;
        }
        // search all path locations within the current turret's range
        for (const pathIdx of turrets[turret].shotRange) {
          let currPathLoc = PATH.indexOf(pathIdx);
          if (state[currPathLoc]) {
            turrets[turret].remShots--;
            state[currPathLoc] -= 1;
            totShotsFired++;
            currShotsFired++;

            if (!state[currPathLoc]) {
              totAliens--;
            }
            break;
          }
        }
      }
      // break if all available shots have been fired, or if no aliens are in
      // range of any turrets.
      if (totShotsFired === totalShots || currShotsFired === 0) {
        break;
      }
    }

    // reset turret shots
    for (turret in turrets) {
      turrets[turret].remShots = turrets[turret].totShots;
    }

    // update state
    totHealthPoints += state.pop();
    if (aliens.length) {
      state.unshift(aliens.shift());
    }
    else {
      state.unshift(0);
    }

    // while loop exit conditions
    if (totAliens === 0) {
      break;
    }
    if (state.reduce((prev, curr) => prev + curr, 0) === 0 && !aliens.length) {
      break;
    }
  }

  return totHealthPoints;
}

// get indexes of path. grid is now a single string reduced from the original
// nested array.
function getPath(grid, start, N) {
  PATH.push(start);
  let hasNeighbor = true, prevIdx = start, curIdx = start, n, s, e, w;
  let foundPath = new Set();
  while (hasNeighbor) {
    n = (curIdx - N >= 0) ? curIdx - N : null;
    s = (curIdx + N < grid.length) ? curIdx + N : null;
    e = ((curIdx % N) + 1 < N) ? curIdx + 1 : null;
    w = ((curIdx % N) - 1 >= 0) ? curIdx - 1 : null;

    prevIdx = curIdx;
    for (const idx of [n, s, e, w]) {
      if ((idx || idx === 0) && grid[idx] === "1" && !foundPath.has(idx)) {
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
}

// calculate the path indices that are in range of the turret, t.
// uses Euclidean distance between two points of a 2D array.
function getTurretTargets(t, turrets, N) {
  let tPos = turrets[t][2], tRange = turrets[t][0];
  let tRow = Math.floor(tPos / N), tCol = tPos % N, pRow, pCol, distance;
  let tTargets = [];

  for (const pos of PATH) {
    pRow = Math.floor(pos / N);
    pCol = pos % N;
    distance = Math.sqrt(Math.pow(pRow - tRow, 2)  + Math.pow(pCol - tCol, 2));
    if (distance <= tRange) {
      tTargets.push(pos)
    }
  }

  turrets[t] = {
    totShots: turrets[t][1],
    remShots: turrets[t][1],
    shotRange: tTargets.reverse(),
  }
}