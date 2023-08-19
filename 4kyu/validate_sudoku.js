// Solution for 4kyu Kata "Validate Sudoku with size NxN" https://www.codewars.com/kata/540afbe2dc9f615d5e000425/train/javascript

var Sudoku = function(data) 
{
  let valid = true;
  let N = data.length;
  let M = Math.sqrt(N);
  data = [].concat(...data);
  let rows = new Array(N * N).fill(0);
  let cols = new Array(N * N).fill(0);
  let squares = new Array(N * N).fill(0);

  // Assign digits of data array by rows and columns to the respective arrays
  // First N digits of rows will be the first row in data in ordered fashion.
  // Same goes for columns and squares. A zero in rows, cols, or squares arrays
  // after indicates a missing digit, meaning there was a duplicate digit in 
  // the row, column, or square. Any zeros means the board is invalid.
  function assignDigits() {
    let j = 0;
    for (let i = 0; i < data.length; i++) {
      if (typeof(data[i]) !== "number") {
        valid = false;
      }
      if (i > 0 && i % N === 0) j -= (N * N - 1);
      let currRow = data[i];
      let currCol = data[j];
      rows[currRow+(Math.floor(i/N))*N-1] = currRow;
      cols[currCol+(Math.floor(i/N))*N-1] = currCol;
      j += N;
    }

    // Assigning square digits to a 1D array requires several loops to determine
    // the combinations. 
    let itr = 0;
    for (let row = 0; row < data.length; row += N*M) {
      for (let col = row; col < row + N; col += M) {
        for (let sqr = col; sqr < col + M; sqr ++) {
          for(let i = 0; i < M; i++) {
            let currSqr = data[sqr+i*N]
            squares[currSqr+(itr*N)-1] = currSqr;
          }
        }
        itr++;
      }
    }
  }

  return {
    isValid: function() {
      assignDigits();
      if (rows.includes(0) || cols.includes(0) || squares.includes(0)) {
        valid = false;
      }
      return valid;
    }
  };
};