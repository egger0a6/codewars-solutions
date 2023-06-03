// solution for 4kyu Kata "The Observed Pin" https://www.codewars.com/kata/5263c6999e0f40dee200059d/train/javascript

function getPINs(observed) {
  let adjacentDigits = 
  { 
    "1": ["2", "4"],
    "2": ["1", "3", "5"],
    "3": ["2", "6"],
    "4": ["1", "5", "7"],
    "5": ["2", "4", "6", "8"],
    "6": ["3", "5", "9"],
    "7": ["4", "8"],
    "8": ["5", "7", "9", "0"],
    "9": ["6", "8"],
    "0": ["8"],
  };
  
  let possiblePins = [];
  let possibleDigits = [];
  observed.split("").forEach(digit => {
    possibleDigits.push([digit, ...adjacentDigits[digit]]);
  });
  possiblePins = cartesianProduct(0, possibleDigits).map(digits => digits.join(""));
  return possiblePins;
}

// The possible pins is the cartesian product (set theory) of the adjacent
// digits of each digit in the observed pin.

// recursive function that returns the cartesian product of n arrays.
// Call with i=0
function cartesianProduct(i, digits) {
  if (i === digits.length) {
    return [[]];
  }
  let next = cartesianProduct(i + 1, digits);
  let result = [];
  for (let j = 0; j < digits[i].length; j++) {
    for (let k = 0; k < next.length; k++) {
      let concat = [];
      concat.push(digits[i][j]);
      concat = [...concat, ...next[k]];
      result.push(concat);
    }
  }
  return result;
}

console.log(getPINs("369"));
console.log(getPINs("0"))

// let arr1 = ["2", "3", "6"];
// let arr2 = ["3", "5", "6", "9"]
// console.log(arr1.map(t => arr2.map(g => t + 6)))



// import java.io.*;
// import java.util.*;

// public class MyProgram
// {

//     public static void main(String[] args)
//     {
//         List<List<String>> listOfLists = new ArrayList<List<String>>();
//         listOfLists.add(new ArrayList<String>());
//         listOfLists.get(0).add("7");
//         listOfLists.get(0).add("9");
//         listOfLists.get(0).add("5");
//         listOfLists.get(0).add("0");
        
//         System.out.println(cartesianProduct(0, listOfLists).toString());
//     }
    
//     public static <T> List<List<T>> cartesianProduct(int i, List<T>... a) {
//     System.out.println(a.length);
//     System.out.println(a[0].toString());
//     if (i == a.length) {
//         List<List<T>> result = new ArrayList<>();
//         result.add(new ArrayList());
//         return result;
//     }
//     List<List<T>> next = cartesianProduct(i + 1, a);
//     //System.out.println(next.size());
//     List<List<T>> result = new ArrayList<>();
//     //System.out.println(result.toString());
//     for (int j = 0; j < a[i].size(); j++) {
//         for (int k = 0; k < next.size(); k++) {
//             System.out.println(a[i].size());
//             System.out.println(j);
//             List<T> concat = new ArrayList();
//             concat.add(a[i].get(j));
//             System.out.println(concat.toString());
//             concat.addAll(next.get(k));
//             result.add(concat);
//         }
//     }
//     return result;
//     }
// }