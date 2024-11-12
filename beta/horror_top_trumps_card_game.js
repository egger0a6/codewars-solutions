// Solution for Beta Kata "Horror Top Trumps (card game)" https://www.codewars.com/kata/580fc02712b34df85f00022e

function Player(name, deck, active) {
  this.deck = [...deck];
  const playerName = name;
  let deckSize = this.deck.length;
  const opponentCards = new Array(deckSize).fill(0);
  const attributes = ["Physical Strength", "Fear Factor", "Killing Power", "Horror Rating"];

  // name is player name
  // deck is an array of cards given to a player forming a hand
  // (opponents will have the exact same number of cards)
  // active is a Boolean, whether this player will start first
  this.name = function () {
    return playerName;
  };

  this.play = function (attribute, val) {
    // Attribute and val are only provided when the opponent has control
    // - attribute[optional] is the attribute you have to use
    // - val[optional] is the value you have to beat
    // if it is your player's turn, choose an attribue to play
    // Return [card, attribute, attributeValue]
    
    if (typeof(attribute) === "object") {
      [attribute, val] = Array.prototype.slice.call(arguments, 1);
    }

    let activeCard = this.deck.shift();
    let opponentCard = opponentCards.shift();

    // Opponent's turn (attribute and val provided as arguments)
    if (val) {
      // Just return top card with it's corresponding attribute and value
      return [activeCard, attribute, activeCard[attribute]];
    }
    // Player's turn
    else {
      // Opponent's top card is known
      if (opponentCard) {
        // Find out if player's top card has an attribute that will beat the opponent's
        let maxAttribute = "";
        for (const attr of attributes) {
          if (activeCard[attr] > opponentCard[attr]) {
            maxAttribute = attr;
            break;
          }
          else {
            continue;
          }
        }
        // If maxAttribute, a winning attribute was found and is returned with its val
        // Else top card's max attribute + value is returned
        return [
          activeCard,
          maxAttribute ? maxAttribute : activeCard.maxAttribute[0],
          maxAttribute ? activeCard[maxAttribute] : activeCard.maxAttribute[1],
        ]
      }
      // Opponent's card is not known
      else {
        // Just return top card of deck with its max attribute
        return [activeCard, activeCard.maxAttribute[0], activeCard.maxAttribute[1]];
      }
    }
  };

  this.win = function (cardsWon) {
    // This is called on your player when you win a hand
    // 'cardsWon' is an array, the cards you won in the order played
    // Calculate the current state of each player's hand
    // Return the current deckSize

    this.deck.push(...cardsWon);
    calcCardsMaxAttr();
    deckSize = this.deck.length;
    return deckSize;
  };

  this.lose = function (cardsLost) {
    // This is called on your player when you loses a hand
    // 'cardLost' is an array, the cards you won in the order played
    // Calculate the current state of each player's hand
    // Return the current deckSize

    if (!Array.isArray(cardsLost)) {
      cardsLost = [cardsLost];
    }

    opponentCards.push(...cardsLost);
    deckSize = this.deck.length;
    return deckSize;
  };

  this.tie = function () {
    // This is called on your hand results in a draw or tie
    // Return the current deckSize (remember you just played a card)
    return this.deck.length;
  };

  // Finds the max attribute for given card
  let findMaxAttribute = (card) => {
    let max = 0;
    let maxAttribute = "";
    for (const attr of attributes) {
      if (card[attr] > max) {
        max = card[attr];
        maxAttribute = attr;
      }
      else {
        continue;
      }
    }

    return [maxAttribute, max];
  }

  // Calculates the largest attribute of each in the player's deck
  let calcCardsMaxAttr = () => {
    for (const card of this.deck) {
      if (card.maxAttribute) {
        continue;
      }
      else {
        card.maxAttribute = findMaxAttribute(card);
      }
    };
  }
  calcCardsMaxAttr();
}