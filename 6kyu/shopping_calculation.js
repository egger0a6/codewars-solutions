// Solution for 6kyu Kata "Shopping Calculation" https://www.codewars.com/kata/5fc907f91853c00018787c73

function shoppingCalculation(input) {
  const output = [];

  // {productName: price}
  const prices = {};
  // {customerName: budget}
  const budgets = {};
  // {customerName: order}
  const orders = {};

  for (let str of input) {
    if (/is \$\d+\.$/.test(str)) {
      str = str.split(" ");
      prices[str[0].toLowerCase()] = str[2].replaceAll(/[\$.]/g, "");
    } else {
      str = str.split(" ");
      let name = str[0];
      if (!orders[name]) orders[name] = [];
      if (str.length === 3) {
        budgets[name] = str[2].replaceAll(/[\$.]/g, "");
      } else {
        orders[name].push([str[2], str[3].replace(".", "")]);
      }
    }
  }

  for (const person in orders) {
    const result = [];
    for (const order of orders[person]) {
      budgets[person] -= order[0] * prices[order[1].replace(/s$/, "")];
      result.push(`${order[0]} ${order[1]}`);
    }
    output.push([person, `$${budgets[person]}`, result.join(", ")]);
  }

  return output;
}