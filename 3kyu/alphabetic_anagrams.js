// Solution for 3kyu Kata "Alphabetic Anagrams" https://www.codewars.com/kata/53e57dada0cb0400ba000688/train/javascript

function listPosition(word) {
  // calculate n! where 0! = 1
  let factorial = (n) => 
    (n <= 1) ? 1 : n * factorial(--n);

  // calcuate multinomial coefficent
  let  calcSubPermutations = (occurences, currLetter) => {
    let denom = 1;
    for (letter in occurences) {
      (letter === currLetter) ? denom *= factorial(occurences[letter]-1) : 
        denom *= factorial(occurences[letter]);
    }
    return denom;
  }

  let 
  letters = word.split(""),
  sorted = word.split("").sort((a, b) => (a < b) ? -1 : (a > b) ? 1 : 0),
  occurences = {};

  for (const letter of sorted) {
    occurences[letter] ? occurences[letter]++ : occurences[letter] = 1;
  }

  // recursive function that totals the number of anagrams preceding the given
  // word alphabetically using multinomial coefficients:
  // https://www.wikiwand.com/en/Multinomial_theorem#/Number_of_unique_permutations_of_words
  // example: "BUBBLE". letters = [B, U, B, B, L, E], sorted = [B, B, B, E, L, U].
  //  Checks subpermutations of sorted by starting with...
  //  "B" : we want "B", so remove from sorted [B, B, E, L, U] => recurse
  //  calcSubPermutations for "B[B]", "B[E]", "B[L]": 24 + 12 + 12
  //  "U" we want "U", remove [B, B, E, L] => recurse
  //  "B" we want "B", remove [B, E, L] => recurse
  //  "B" we want "B", remove [E, L] => recurse
  //  calcSubPermutations for "BUBB[E]": 1
  //  "L" we want "L", remove [E] => recurse
  //  "E" we want "E", remove [] => recurse
  //  List is now empty and "BUBBLE" is "built" so all alphabetically proceeding
  //    anagrams have been calculated
  //  RETURN 1 and exit call stack
  //  wordIndex = 24 + 12 + 12 + 1 + 1 = 50
  function calcIndex(currLettersIdx=0)  {
    if (!sorted.length) {
      return 1;
    }

    let wordIndex = 0;
    // for the remaining sorted letters...
    for (let i = 0; i < sorted.length; i++) {
      // Is sorted[i] the same letter as the current position in the given word?
      // No? Then add the number of anagrams that proceed it alphabetically
      if (sorted[i] !== letters[currLettersIdx]) {
        if (sorted[i] !== sorted[i+1]) {
          wordIndex += 
            factorial(sorted.length-1) / calcSubPermutations(occurences, sorted[i]);
        }
        else {
          continue;
        }
      }
      // sorted[i] === current letter of the given word so remove it from the 
      // alphabetically sorted letters. Then recurse to check the next anagrams
      // that proceed as the function "builds" the given word.
      else {
        occurences[sorted[i]]--
        sorted.splice(i, 1);
        break;
      }
    }
    return wordIndex += calcIndex(++currLettersIdx);
  }

  return calcIndex();
}

// console.log(listPosition("QUESTION"))
// console.log(listPosition("BOOKKEEPER"))
// console.log(listPosition("BUBBLE"))