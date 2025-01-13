// Solution for 6kyu Kata "Texting with an old-school mobile phone" https://www.codewars.com/kata/5ca24526b534ce0018a137b5

const key = {
  ".": ["1", "1"],
  ",": ["1", "11"],
  "?": ["1", "111"],
  "!": ["1", "1111"],
  "a": ["2", "2"],
  "b": ["2", "22"],
  "c": ["2", "222"],
  "d": ["3", "3"],
  "e": ["3", "33"],
  "f": ["3", "333"],
  "g": ["4", "4"],
  "h": ["4", "44"],
  "i": ["4", "444"],
  "j": ["5", "5"],
  "k": ["5", "55"],
  "l": ["5", "555"],
  "m": ["6", "6"],
  "n": ["6", "66"],
  "o": ["6", "666"],
  "p": ["7", "7"],
  "q": ["7", "77"],
  "r": ["7", "777"],
  "s": ["7", "7777"],
  "t": ["8", "8"],
  "u": ["8", "88"],
  "v": ["8", "888"],
  "w": ["9", "9"],
  "x": ["9", "99"],
  "y": ["9", "999"],
  "z": ["9", "9999"],
  "'": ["*", "*"],
  "-": ["*", "**"],
  "+": ["*", "***"],
  "=": ["*", "****"],
}

const sendMessage = (message) => {
  let caps = false;
  let hold = false;
  let prevButton = "";

  message = message
  .split("")
  .reduce((prev, curr) => {
    let currStr = "";
    let currButton = key[curr.toLowerCase()] ? key[curr.toLowerCase()][0] : curr;

    if (/\s/.test(curr)) {
      // current char is whitespace
      if (prevButton === "0" && !hold) currStr += " ";
      prevButton = "0";
      hold = false;
      currStr += "0";
    }
    else if (/[#*]|\d/.test(curr)) {
      // current char is a digit
      currStr += prevButton === currButton && !hold ? " " : "";
      prevButton = curr;
      hold = true;
      currStr += curr + "-";
    }
    else if (/[A-Z]/.test(curr)) {
      // current char is Uppercase Letter
      if (prevButton === currButton && caps && !hold) currStr += " ";
      currStr += caps ? key[curr.toLowerCase()][1] : "#" + key[curr.toLowerCase()][1];
      prevButton = currButton;
      hold = false;
      caps = true;
    }
    else {
      // current char is found in key (i.e. a char that can be input without holding and not
      // the space or case button)
      if (caps && currButton !== "*" && currButton !== "1") {
        currStr += "#" + key[curr][1];
        caps = !caps;
      }
      else {
        if (!hold && prevButton === currButton) currStr += " ";
        currStr += key[curr][1];
      }

      prevButton = currButton;
      hold = false;
    }

    return prev + currStr;
  }, "");

  return message;
}