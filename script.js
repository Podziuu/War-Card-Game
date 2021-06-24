import Deck from "./deck.js"

const CARD_VALUE_MAP = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
}

const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const computerDeckElement = document.querySelector('.computer-deck');
const playerDeckElement = document.querySelector('.player-deck');
const text = document.querySelector('.text');

let playerDeck, computerDeck, inRound, stop;

document.addEventListener('click', function() {
    if(stop) {
        startGame();
        return;
    }

    if(inRound) {
        cleanBeforeRound()
    } else {
        flipCards();
    }
})

startGame();
function startGame() {
    const deck = new Deck;
    deck.shuffle();

    const deckMidPoint = Math.ceil(deck.numberOfCards / 2);
    playerDeck = new Deck(deck.cards.slice(0, 1));
    computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards));
    console.log(playerDeck);
    console.log(computerDeck);
    inRound = false;
    stop = false;

    cleanBeforeRound()
}


function cleanBeforeRound() {
    inRound = false;
    text.innerHTML = '';
    computerCardSlot.innerHTML = '';
    playerCardSlot.innerHTML = '';

    updateDeckCount();
}

function updateDeckCount() {
    computerDeckElement.innerHTML = computerDeck.numberOfCards;
    playerDeckElement.innerHTML = playerDeck.numberOfCards;
}

function flipCards() {
    inRound = true;

    const playerCard = playerDeck.pop();
    const computerCard = computerDeck.pop();

    playerCardSlot.appendChild(playerCard.getHtml());
    computerCardSlot.appendChild(computerCard.getHtml());

    updateDeckCount();

    if(isWinner(playerCard, computerCard)) {
        text.innerHTML = 'Win';
        playerDeck.push(playerCard);
        playerDeck.push(computerCard);
    } else if (isWinner(computerCard, playerCard)) {
        text.innerHTML = 'Lose';
        computerDeck.push(playerCard);
        computerDeck.push(computerCard);

    } else {
        text.innerHTML = 'Draw!';
        playerDeck.push(playerCard);
        computerDeck.push(computerCard);
    }

    if(isGameOver(playerDeck)) {
        stop = true;
        text.innerHTML = 'Computer Win!';
    } else if(isGameOver(computerCard)) {
        stop = true;
        text.innerHTML = 'Player win!';
    }
}

function isWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
    return deck.numberOfCards === 0;
}