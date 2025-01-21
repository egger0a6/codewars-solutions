// Solution for 5kyu Kata "Christmas mission: Distribute gifts #4" https://www.codewars.com/kata/5850bff5b76e6599aa00011a


function distributeGifts(n, wishesAndGifts){
  // create arrays responding to amounts gifts and cookies for each child
  // i.e. child1's gifts = g[0] and cookies = c[0]
  let g = [];
  let c = [];
  for (const child of wishesAndGifts) {
    g.push(child[0]);
    c.push(child[1]);
  }

  // number of children
  let k = g.length;

  // array to store max amount of cookies per number of gifts
  // i.e. dp[i] = total cookies when i gifts are granted
  let dp = new Array(n + 1).fill(0);
  
  // iterate through all the children, k
  for (let i = 0; i < k; i++) {
    // traverse dp array from right to left while j, gifts granted, is gt or equal
    // to current child, i's, wished gifts
    for (let j = n; j >= g[i]; j--) {
      /*
        find maximum of dp[j] (exluding ith child's cookies)
        and c[i] + dp[j - g[i]] (including ith child's cookies plus the
        max cookies possible when "current remaining gifts - ith child's wish")
      */
      dp[j] = Math.max(dp[j], c[i] + dp[j - g[i]])
    }
  }

  return dp[n];
}