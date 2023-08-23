let globalN;
let globalLen;
let turrPositions = {};
const PATH = [];

function towerDefense(grid,turrets,aliens){
	setup(grid, turrets);
  console.log(PATH);
  console.log(turrets);
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
    printState(state);
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
        console.log("validShots: " + validShots)

        while (true) {
          for (const turret of validTurrets) {
            if (turrets[turret].remShots) {
              console.log(turret)
              console.log(state[i])
              if (state[i]) {
                state[i] -= 1;
                turrets[turret].remShots--;
                validShots--;
              }
              else {
                totAliens--;
                break;
              }
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
    //distance = Math.abs(pRow - tRow) + Math.abs(pCol - tCol);
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


// Test cases ==================================================================

let grid = [
  '0111111',
  '  A  B1',
  ' 111111',
  ' 1     ',
  ' 1C1111',
  ' 111 D1',
  '      1'
];
let turrets = {A:[3,2],B:[1,4],C:[2,2],D:[1,3]};
let aliens = [30,14,27,21,13,0,15,17,0,18,26];
// console.log(towerDefense(grid, turrets, aliens))

grid = [
  '011  1111',
  ' A1  1BC1',
  ' 11  1 11',
  ' 1D  1 1E',
  ' 111 1F11',
  '  G1 1  1',
  ' 111 1 11',
  ' 1H  1 1I',
  ' 11111 11'
]
turrets = {A:[1,4],B:[2,2],C:[1,3],D:[1,3],E:[1,2],F:[3,3],G:[1,2],H:[2,3],I:[2,3]};
aliens = [36,33,46,35,44,27,25,48,39,0,39,36,55,22,26];
// console.log(towerDefense(grid, turrets, aliens));

grid = [
  '01111111',
  ' A    B1',
  '11111111',
  '1 C D E ',
  '1 111111',
  '1 1F  G1',
  '1H1 1111',
  '111 1   '
];
turrets = {A:[2,2],B:[1,3],C:[3,3],D:[1,2],E:[1,4],F:[2,3],G:[1,3],H:[2,2]};
aliens = [37,29,16,13,42,39,8,14,35,26,59,0,44,19,17,35,49,31,0,43];
// console.log(towerDefense(grid, turrets, aliens));

grid = [
  '1111111111',
  '1A      B1',
  '111C111111',
  '  1 1D    ',
  '011E111111',
  '        F1',
  'G1111111 1',
  '11  H  111',
  '1 I111  J ',
  '1111K11111'
];
turrets = {A:[1,2],B:[1,4],C:[1,3],D:[2,2],E:[3,3],F:[1,3],G:[2,2],H:[1,3],I:[2,2],J:[1,3],K:[1,2]};
aliens = [36,27,19,35,0,60,0,80,35,18,49,53,0,47,0,62,0,34,26,53,35,0,31,44,64,21,31,0,59,30,53,31,42,39];
// console.log(towerDefense(grid, turrets, aliens));

grid = [
  '11111111111',
  '1A  B   C 0',
  '111 111111 ',
  ' D1 1E   1 ',
  '111 1 1111 ',
  '1F  1 1    ',
  '1 111 1G111',
  '1 1 H 1 1I1',
  '1J1 111 1 1',
  '111 1K  1 1',
  '    11111 1'
];
turrets = {A:[1,3],B:[1,2],C:[2,2],D:[1,4],E:[4,2],F:[2,2],G:[3,2],H:[1,2],I:[1,2],J:[2,3],K:[1,3]};
aliens = [50,40,25,54,26,0,64,21,36,35,0,24,38,0,69,32,56,24,33,63,19,56,39,43,28,11,42,32,51,43,27,0,42,0,0,65,24,28,38,29,0,45,34,27,44];
console.log(towerDefense(grid, turrets, aliens));