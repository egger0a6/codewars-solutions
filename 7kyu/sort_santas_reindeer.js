// Solution for 7kyu Kata "Sort Santa's Reindeer" https://www.codewars.com/kata/52ab60b122e82a6375000bad

function sortReindeer(reindeerNames) {
  // let regex = /[A-Z](?=[a-z]*$)/;
  // let regex = /[A-Z][a-z]*$/;
  
  return reindeerNames.sort((nameA, nameB) => {
    return nameA.slice(nameA.search(" ")).localeCompare(nameB.slice(nameB.search(" ")));
  });
}