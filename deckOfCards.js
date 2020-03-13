const suits = ['hearts', 'dimonds', 'spades', 'clubs']

const faceVal = [2,3,4,5,6,7,8,9,10,'J', 'Q', 'K', 'A']

let deck = [];
let dealersHand = [];
let playersHand = [];
let deckIndex = 4;

// create a deck of cards
(mkDeck = () => {
  for (v in faceVal) {
    for (s in suits) {
      deck.push(faceVal[v] + ' of ' + suits[s])
    }
  }
})();


// shuffle deck of cards
(shuffleDeck = deck => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
})(deck);


// deal cards to player and dealer from the top of shuffled deck
(deal = () => {
  playersHand.push(deck[0]);
  dealersHand.push(deck[1]);
  playersHand.push(deck[2]);
  dealersHand.push(deck[3]);
})();



// find the value of the dealers show hand
calShowVal = (hand) => {
    if (hand.charAt(0) === 'A') {
      return 11;
    }else if (hand.charAt(0) === 'K') {
      return 10;
    }else if (hand.charAt(0) === 'Q') {
      return 10;
    }else if (hand.charAt(0) === 'J') {
      return 10;
    }else{
      return parseInt(hand);
    }
};


// find the value of a hand
calHandVal = (hand) => {
  const v = [];
  for (i in hand) {
    if (hand[i].charAt(0) === 'A') {
      v.push(11);
    }else if (hand[i].charAt(0) === 'K') {
      v.push(10);
    }else if (hand[i].charAt(0) === 'Q') {
      v.push(10);
    }else if (hand[i].charAt(0) === 'J') {
      v.push(10);
    }else{
      v.push(parseInt(hand[i]));
    }
  }
  return v[0] + v[1];
}

let playersVal = calHandVal(playersHand);
let dealersShowCard = dealersHand[1];
let dealersVal = calHandVal(dealersHand);
let dealersShowVal = calShowVal(dealersShowCard);


// player asks for another card
hit = () => {
  playersHand.push(deck[deckIndex]);

  if (deck[deckIndex].charAt(0) === 'A') {
    playersVal += 11;    
  }else if (deck[deckIndex].charAt(0) === 'K') {
    playersVal += 10;    
  }else if (deck[deckIndex].charAt(0) === 'Q') {
    playersVal += 10;    
  }else if (deck[deckIndex].charAt(0) === 'J') {
    playersVal += 10;    
  }else{
    playersVal += parseInt(deck[deckIndex]);
  }
  deckIndex++;
  

  // convert Ace to a value of 1 when player has over 21
  if (playersVal > 21) {
    for (i in playersHand) {
      if (playersHand[i].charAt(0) === 'A') {
        console.log('if statment reached');
        playersHand[i] = '1' + playersHand[i];
        playersVal -= 10;
      }
    }
  }
  console.log(playersHand, playersVal);
  document.getElementById('playersVal').innerHTML = playersVal;
  if (playersVal == 21) {
    document.getElementById('playerStatus').innerHTML = '21';
  }
  if (playersVal > 21) {
    document.getElementById('playerStatus').innerHTML = 'Bust';
  }
}


// all actions taken by dealer when player chooses to stay
stay = () => {
  document.getElementById('dealersTurn').innerHTML = 'Dealer has';
  document.getElementById('dealersVal').innerHTML = dealersVal;
  if (dealersVal < 17) {
    dealersHand.push(deck[deckIndex]);

  if (deck[deckIndex].charAt(0) === 'A') {
    dealersVal += 11;    
  }else if (deck[deckIndex].charAt(0) === 'K') {
    dealersVal += 10;    
  }else if (deck[deckIndex].charAt(0) === 'Q') {
    dealersVal += 10;    
  }else if (deck[deckIndex].charAt(0) === 'J') {
    dealersVal += 10;    
  }else{
    dealersVal += parseInt(deck[deckIndex]);
  }
  deckIndex++;
}

  // convert Ace to a value of 1 when player has over 21
  if (dealersVal > 21) {
    for (i in dealersHand) {
      if (dealersHand[i].charAt(0) === 'A') {
        console.log('if statment reached');
        dealersHand[i] = '1' + dealersHand[i];
        dealersVal -= 10;
      }
    }
  }
  console.log(dealersHand, dealersVal);
  document.getElementById('dealersVal').innerHTML = dealersVal;
  if (dealersVal == 21) {
    document.getElementById('dealerStatus').innerHTML = '21';
  }
  if (dealersVal > 21) {
    document.getElementById('dealerStatus').innerHTML = 'Bust';
  }
}


// display dealers show value
document.getElementById('dealersVal').innerHTML = dealersShowVal;

// display players total value
document.getElementById('playersVal').innerHTML = playersVal;