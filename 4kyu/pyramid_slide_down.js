function longestSlideDown (pyramid) {
  for (let i = pyramid.length - 2; i >= 0; i--) {
    for (let j = 0; j < pyramid[i].length; j++) {
      let left = pyramid[i+1][j];
      let right = pyramid[i+1][j+1];
      pyramid[i][j] += Math.max(left, right);
    }
  }
  return pyramid[0][0];
}