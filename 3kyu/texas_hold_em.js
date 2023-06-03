// solution for 3kyu Kata "Texas Hold'em Hands" https://www.codewars.com/kata/524c74f855025e2495000262/train/javascript

function hand(holeCards, communityCards) {
  console.log([...holeCards, ...communityCards])
  let cards = processCards([...holeCards, ...communityCards]);
  console.log(cards)
  let hand = processHand(cards);
  console.log(hand)
  return {type:hand[0], ranks: hand[1]};
}

function processHand(cards) {
  let rankings = "141312111098765432";
  let ranks = [];
  let flush = [];
  let straights = [];

  let suits = {};
  let counts = {};
  for (const card in cards) {
    let suitList = cards[card].suits;
    for (suit of suitList) {
      if (suit in suits) {
        suits[suit]++;
      }
      else {
        suits[suit] = 1;
      }
    }
    counts[card] = cards[card].count;
  }
  console.log(suits)
  console.log(counts)

  // check for a straight
  let cardList = Object.keys(cards).reverse();
  console.log(cardList)
  let start = 0;
  let end = 5;
  while (end <= cardList.length) {
    let straight = [];
    let partial = cardList.slice(start, end);
    if (rankings.search(partial.join("")) !== -1) {
      for (const rank of partial) {
        straight.push(rank)
      }
      straights.push(straight);
    }
    start++;
    end++;
  }
  console.log(straights)

  // check for a straight-flush
  for (straight of straights) {
    for (suit of cards[straight[0]].suits) {
      let straightFlush = true;
      for (card of straight) {
        if (cards[card].suits.includes(suit)) {
          continue;
        }
        else {
          straightFlush = false;
          break;
        }
      }
      if (straightFlush) {
        straight = straight.map(rank => cards[rank].type)
        return ["straight-flush", straight];
      }
    }
  }

  // check for a flush
  for (const suit in suits) {
    if (suits[suit] >= 5) {
      for (const card of cardList) {
        if (cards[card].suits.includes(suit)) {
          flush.push(cards[card].type)
          if (flush.length === 5) {
            break;
          }
        }
      }
    }
  }
  console.log(flush)

  let typeCounts = Object.values(counts);

  // check four-of-a-kind
  if (typeCounts.includes(4)) {
    for (const card in counts) {
      if (counts[card] === 4) {
        ranks.push(cards[card].type);
      }
    }
    for (card of cardList) {
      let type = cards[card].type;
      if (!ranks.includes(type)) {
        ranks.push(type);
        if (ranks.length === 2) break;
      }
    }
    return ["four-of-a-kind", ranks];
  }

  // check full house
  let pairOrTripleCount = 0;
  pairOrTripleCount = typeCounts.reduce((prev, curr) => {
    if (curr >= 2) {
      return prev + 1;
    }
    return prev + 0;
  },0);
  if (typeCounts.includes(3) && pairOrTripleCount >= 2) {
    for (rank of cardList) {
      if (counts[rank] === 3 || counts[rank] === 2) {
        ranks.push(rank);
        if (ranks.length === 2) break;
      }
    }
    ranks = ranks
    .sort((a, b) => cards[b].count - cards[a].count)
    .map(rank => cards[rank].type);
    return ["full house", ranks];
  }
  
  // flush is the best hand
  if (flush.length) {
    return ["flush", flush];
  }
  
  /// straight is the best hand
  if (straights.length) {
    let straight = straights[0].map(rank => cards[rank].type);
    return ["straight", straight];
  }

  // check three-of-a-kind
  if (typeCounts.includes(3)) {
    for (const card in counts) {
      if (counts[card] === 3) {
        ranks.push(cards[card].type);
      }
    }
    for (card of cardList) {
      let type = cards[card].type;
      if (!ranks.includes(type)) {
        ranks.push(type);
        if (ranks.length === 3) break;
      }
    }
    return ["three-of-a-kind", ranks];
  }

  // check two pair
  let pairCount = typeCounts.reduce((prev, curr) => {
    if (curr === 2) {
      return prev + 1;
    }
    return prev + 0;
  },0);
  if (pairCount >= 2) {
    for (card of cardList) {
      if (counts[card] === 2) {
        ranks.push(card);
        if (ranks.length === 2) break;
      }
    }
    ranks = ranks
    .sort((a, b) => b - a)
    .map(rank => cards[rank].type);
    for (card of cardList) {
      let type = cards[card].type;
      if (!ranks.includes(type)) {
        ranks.push(type);
        if (ranks.length === 3) break;
      }
    }
    return ["two pair", ranks];
  }

  // check pair
  if (typeCounts.includes(2)) {
    for (card in counts) {
      if (counts[card] === 2) {
        ranks.push(cards[card].type);
      }
    }
    for (card of cardList) {
      let type = cards[card].type;
      if (!ranks.includes(type)) {
        ranks.push(type);
        if (ranks.length === 4) break;
      }
    }
    return ["pair", ranks];
  }

  // hand contains nothing
  for (const card of cardList) {
    ranks.push(cards[card].type);
    if (ranks.length === 5) break;
  }
  return ["nothing", ranks];
}


function processCards(cards) {
  let processedCards = {};
  cards.forEach(card => {
    let type = card.match(/[\w]+/g)[0];
    let rank = type === "J" ? "11" : 
    type === "Q" ? "12" : 
    type === "K" ? "13" :
    type === "A" ? "14" :
    type;
    if (rank in processedCards) {
      processedCards[rank].count++;
      processedCards[rank].suits.push(card.match(/[^\w+]/g)[0]);
    }
    else {
      let properties = {};
      properties.suits = [card.match(/[^\w+]/g)[0]];
      properties.count = 1;
      properties.type = type;
      processedCards[rank] = properties;
    }
  })
  return processedCards;
}

// hand(['K♠','A♦'],['J♣','Q♥','9♥','2♥','3♦']);
// console.log(hand(['K♠','Q♦'],['J♣','Q♥','9♥','2♥','3♦']));
// hand(['K♠','J♦'],['J♣','K♥','9♥','2♥','3♦']);
// hand(['4♠','9♦'],['J♣','Q♥','Q♠','2♥','Q♦']);
// hand(['Q♠','2♦'],['J♣','10♥','9♥','K♥','3♦']);
// hand(['A♠','K♦'],['J♥','5♥','10♥','Q♥','3♥']);
// hand(['A♠','A♦'],['K♣','K♥','A♥','Q♥','3♦']);
// hand(['2♠','3♦'],['2♣','2♥','3♠','3♥','2♦']);
// console.log(hand(['8♠','6♠'],['7♠','5♠','9♠','J♠','10♠']));
// console.log(hand(['10♥', 'Q♣'], ['10♣', '5♣', '6♣', '3♣', '9♠']));
// console.log(hand(['10♥', '3♣'], ['7♣', '6♣', '5♣', 'K♣', '4♣']));
// console.log(hand(['8♦', '10♥'], ['7♦', '6♦', 'J♠', '9♦', '10♦']));
// console.log(hand([ '4♥', '4♦'], ['8♦', '3♥', '8♥', '9♥', '3♣']));
// console.log(hand(['3♥', '7♥'], ['5♥', '4♥', '7♣', '7♦', '6♥']));
// console.log(hand(['J♣', '4♠'], ['4♦', '8♦', '6♦', '8♠', '6♠']));
// console.log(hand(['3♥', '5♦'], ['3♦', '5♥', '5♠', '2♥', '2♠']));
console.log(hand(['8♠', 'K♦'], ['K♠', '8♦', '8♥', '6♥', 'K♣']));