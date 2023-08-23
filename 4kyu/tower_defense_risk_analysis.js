// Solution to 4kyu Kata "Tower Defense: Risk Analysis" https://www.codewars.com/kata/5a57faad880385f3b60000d0/train/javascript


let globalN;
let globalLen;
let turrPositions = {};
const PATH = [];

function towerDefense(grid,turrets,aliens){
	setup(grid, turrets);
  console.log(PATH)
  console.log(turrets)
  return mainLoop(turrets, aliens);
}


// first pass through the grid to setup data structures
function setup(grid, turrets) {
  globalN = grid.length;
  const N = grid.length;
  grid = grid.reduce((prev, curr) => prev + curr, "");
  globalLen = grid.length;
  let start = grid.indexOf("0");

  // find grid path and store in global array PATH
  getPath(grid, start, N);

  // find indeces of all turrets
  for (let i = 0; i < grid.length; i++) {
    let currChar = grid.at(i);
    if (/[A-Z]/.test(currChar)) {
      turrPositions[currChar] = i;
      turrets[currChar].push(i);
      getTurretTargets(currChar, turrets, N);
    }
  }
}

function mainLoop(turrets, aliens) {
  let state = new Array(PATH.length).fill(0), totAliens = aliens.length;
  let totHealthPoints = 0, move = 0, validShots;

  state[0] = aliens[0];
  while (true) {
    printState(state, turrets);
    for(let i = state.length - 1; i >= 0; i--) {
      if (state[i]) {
        validTurrets = [];

        // determine turrets that are able to shoot current alien and total
        // available shots that said turrets have in the current move.
        validShots = Object.keys(turrets).reduce((prev, curr) => {
          if (turrets[curr].shotRange.includes(PATH[i])) {
            validTurrets.push(curr);
            return prev + turrets[curr].remShots;
          }
          return prev + 0;
        },0);

        while (true) {
          for (turret of validTurrets) {
            if (turrets[turret].remShots) {
              if (state[i]) {
                state[i] -= 1;
                turrets[turret].remShots--;
                validShots--;
              }
              else {
                totAliens--;
                break;
              }
              console.log(turret)
              console.log(state[i])
            }
          }
          if (!state[i]) {
            break;
          }
          if (!validShots) {
            break;
          }
        }
      }
    }

    // reset turret shots
    for (turret in turrets) {
      turrets[turret].remShots = turrets[turret].totShots;
    }
    move++;

    // update state
    totHealthPoints += state.pop();
    if (move < aliens.length) {
      state.unshift(aliens[move]);
    }
    else {
      state.unshift(0);
    }

    // while loop exit conditions
    if (totAliens === 0) {
      break;
    }
    if (state.reduce((prev, curr) => prev + curr, 0) === 0) {
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
}

// calculate the path indices that are in range of the turret, t.
// uses Manhattan Distance: |x1 - x2| + |y1 - y2|
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
  turrets[t] = {
    totShots: turrets[t][1],
    remShots: turrets[t][1],
    shotRange: tTargets.reverse(),
  }
}

// prints state for debugging
function printState(state) {
  let turrLocations = Object.keys(turrPositions).reduce((prev, curr) => {
    return [...prev, turrPositions[curr]]
  }, []);
  let currRow = "";

  for (let i = 0; i < globalLen; i += globalN) {
    for (let j = i; j < i + globalN; j++) {
      if (turrLocations.includes(j)) {
        for (turr in turrPositions) {
          if (turrPositions[turr] === j) {
            currRow += " " + turr + " ";
          }
        }
      }
      else if (PATH.includes(j) && !state[PATH.indexOf(j)]) {
        currRow += " " + 0 + " ";
      }
      else if(PATH.includes(j) && state[PATH.indexOf(j)]) {
        let alien = state[PATH.indexOf(j)];
        currRow += (alien > 9) ? alien + " " : " " + alien + " ";
      }
      else {
        currRow += " - ";
      }
    }
    console.log(currRow);
    currRow = "";
  }
}