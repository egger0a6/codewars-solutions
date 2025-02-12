// Solution for 6kyu Kata "Christmas mission: Distribute gifts #7" https://www.codewars.com/kata/5a40aa008f27f2aba800003a

function distribute(gifts,socks){
  const output = [];

  const childGifts = socks.reduce((prev, curr) => {
    prev.set(curr, 0);
    return prev;
  }, new Map());


  gifts = gifts.sort((a, b) => a - b);
  socks = socks.sort((a, b) => a - b);
  let smallSock = true;

  while (socks.length) {
    if (smallSock) {
      let sock = socks.shift();
      let gift = gifts.pop();
      childGifts.set(sock, gift);
      smallSock = !smallSock;
    } else {
      let sock = socks.pop();
      let gift = gifts.shift();
      childGifts.set(sock, gift);
      smallSock = !smallSock;
    }
  }

  for (const val of childGifts.values()) {
    if (val === undefined) {
      output.push(0);
    } else {
      output.push(val);
    }
  }

  return output;
}