
var cards = [
	{ 
		rank: "queen",
		suit:"hearts",
		cardImage: "images/queen-of-hearts.png"
	},

	{
		rank: "queen",
		suit: "diamond",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

// Found this from https://bost.ocks.org/mike/shuffle/...don't fully understand how it works yet but I modded it to shuffle the cards.
var shuffle = function() {
  var m = cards.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = cards[m];
    cards[m] = cards[i];
    cards[i] = t;
  }
  
  return cards;
}

var sayInstructions = function(){
	alert("Concentration, also known as Memory Game, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs, is a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. The object of the game is to turn over pairs of matching cards.");
}

var instructions = document.getElementById('instructions').addEventListener('click', sayInstructions);

var cardsInPlay = [];

var winCounts = 0;
var loseCounts = 0;

var checkForMatch = function(){	
	if (cardsInPlay.length === 2){
		if (cardsInPlay[0] === cardsInPlay[1]){
			alert("You found a match!");
			winCounts += 1;
			var wins = document.getElementById('wins');
			wins.innerHTML = winCounts;	
		}
		else {
			alert("Sorry, please try again.")
			loseCounts += 1;
			var losses = document.getElementById('losses');
			losses.innerHTML = loseCounts;
		}
	}
}

var flipCard = function(){
	var cardId = this.getAttribute('data-id');
	this.setAttribute('src', cards[cardId].cardImage);
	console.log("User flipped " + cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	cardsInPlay.push(cards[cardId].rank);	
	checkForMatch();
}

var createBoard = function(){
	for (i = 0; i < cards.length; i++){
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

var resetButton = function(){
	var reset = document.getElementById('reset');
	reset.addEventListener('click', gameReset);
}

//This is to remove the img's made from the div (with game-board id). First find the div and then while loop to remove the child img's.
var gameReset = function(){
	var gameBoard = document.getElementById('game-board');
	while (gameBoard.firstChild) {
  		gameBoard.removeChild(gameBoard.firstChild);
	}
	//This clears the cardsInPlay array. I couldn't get the alerts to show up again because the cardsInPlay array kept growing and would never reach a length of 2 needed to pass the alert test.
	while (cardsInPlay.length){
		cardsInPlay.pop();
		console.log(cardsInPlay);
	}	
	shuffle();
	createBoard();
}


resetButton();
shuffle();
createBoard();