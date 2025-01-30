// Solution for 6kyu Kata "Chocolate Celebration" https://www.codewars.com/kata/59ea2a943d09a737c40000ff

function chocolateSplit(people, bars) {
  if (isNaN(people) || isNaN(bars)) return "Error. We need numbers.";
  if (people <= 0) return "Nobody here. Skedaddle.";

  // grp A: 20%(0.2) don't want chocolate => 20% of people don't get any pieces
  // grp B: after all other groups get at least 1 piece, 10%(0.1) want some => 
  //        10% get a piece after groups C and D get one.
  // grp C: 5%(0.05) want some, will take 20 after all other have at least 1
  // grp D: Remaining peopple will want a piece => (people - C - B) want 1 piece

  const b = Math.round(people * 0.1);
  const c = Math.round(people * 0.05);
  const d = people - Math.round(people * 0.2) - b - c;

  const output = [];
  let pieces = bars * 16;
  let basicReq = c + d;
  let satisfied = 0;

  // Calculate if groups D and C get pieces
  for (const g of [d, c]) {
    if (pieces >= g) {
      pieces -= g;
      satisfied += g;
    } else {
      satisfied += pieces;
      pieces = 0;
      break;
    }
  }

  // Check if basic requirements satisfied (groups C and D)
  if (satisfied < basicReq) {
    output.push(
      satisfied,
      pieces,
      "You should buy more chocolate next time",
      Math.round(basicReq / 16) + 1,
    );
    return output;
  }

  // Calculate pieces for group B
  if (pieces >= b) {
    pieces -= b;
    satisfied += b;
  } else {
    satisfied += pieces;
    pieces = 0;
  }

  // There are remaining pieces for group C. 
  // Calculate how much of the excess pieces group C gets up to 20 each.
  if (pieces) {
    let cExcess = 19;
    while (cExcess > 0) {
      if (pieces >= c) {
        pieces -= c;
      }else {
        break;
      }
      cExcess--;
    }
  }

  output.push(satisfied, pieces);

  // If there are still 16+ pieces left over, calculate minimum bars needed to
  // satisfy groups B, C, and D
  if (pieces > 16) {
    output.push("That was too much chocolate!", Math.round(satisfied / 16) + 1);
  }

  return output;
}