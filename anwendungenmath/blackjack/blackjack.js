var dealerCards = [];  // Arrays holding the DisplayCard objects used to show the cards
var playerCards = [];
dealerCards.count = 0;  // Number of cards actually in the dealer's hand
playerCards.count = 0;   // Number of cards actually in the player's hand
var deck = new Deck();
var gameInProgress = false;
var bet;
var betInput;
var money;
var moneyDisplay;
var message;
var standButton, hitButton, newGameButton;  // objects representing the buttons, so I can enable/disable them
var totalplays=0;
var won=0;
var tied=0;
window.onload=init;
function init() {
    for (var i = 1; i <= 5; i++) {
       dealerCards[i] = new DisplayedCard("dealer" + i);
       dealerCards[i].cardContainer.style.display = "none";
       playerCards[i] = new DisplayedCard("player" + i);
       playerCards[i].cardContainer.style.display = "none";
    }
    message = document.getElementById("message");
    standButton = document.getElementById("standButton");
    hitButton = document.getElementById("hitButton");
    newGameButton = document.getElementById("newGameButton");
    moneyDisplay = document.getElementById("money");
    money = 100;
    moneyDisplay.innerHTML = "Fr. " + money;
    betInput = document.getElementById("bet");
    betInput.value = 10;
    betInput.disabled = false;
    standButton.disabled = true;
    hitButton.disabled = true;
    newGameButton.disabled = false;
}
function dealCard(cards, runOnFinish, faceDown) {
    var crd = deck.nextCard();
    cards.count++;
    if (faceDown)
       cards[cards.count].setFaceDown();
    else
       cards[cards.count].setFaceUp();
    cards[cards.count].setCard(crd);
    new Effect.SlideDown(cards[cards.count].cardContainer, {
       duration: 0.5,
       queue: "end",
       afterFinish: runOnFinish
    });
}
function getTotal(hand) {
   var total = 0;
   var ace = false;
   for (var i = 1; i <= hand.count; i++) {
       total += Math.min(10, hand[i].card.value); 
       if (hand[i].card.value == 1)
          ace = true;
   }
   if (total + 10 <= 21 && ace)
      total += 10;
   return total;
}
function startGame() {
   if (!gameInProgress) {
      var betText = betInput.value;
      if (! betText.match(/^[0-9]+$/) || betText < 1 || betText > money) {
          message.innerHTML = "Wettbetrag muss zwischen 1 und " + money + 
               " liegen.<br>Korrigieren und dann Neues Spiel anklicken.";
          return;
      }
      betInput.disabled = true;
      bet = Number(betText);
      for (var i = 1; i <= 5; i++) {
          playerCards[i].cardContainer.style.display = "none";
          playerCards[i].setFaceDown();
          dealerCards[i].cardContainer.style.display = "none";
          dealerCards[i].setFaceDown();
      }
      message.innerHTML = "Karten werden verteilt.<br>&nbsp;";
      deck.shuffle();
      dealerCards.count = 0;
      playerCards.count = 0;
      dealCard(playerCards);
      dealCard(dealerCards);
      dealCard(playerCards);
      dealCard(dealerCards, function() {
        standButton.disabled = false;
        hitButton.disabled = false;
        newGameButton.disabled = true;
        gameInProgress = true;
        var dealerTotal = getTotal(dealerCards);
        var playerTotal = getTotal(playerCards);
        if (dealerTotal == 21) {
            if (playerTotal == 21)
                {tied++;endGame(false, "Beide haben Blackjack, aber Bank gewinnt bei Gleichstand.");}
            else
                endGame(false, "Bank hat Blackjack.");
        }
        else if (playerTotal == 21)
            endGame(true, "Sie haben Blackjack.");
             else
                message.innerHTML = "Sie haben " + playerTotal +".  Neue Karte oder Deal?<br>&nbsp;";
      }, true);
   }
}
function endGame(win, why) {
	totalplays++;
    if (win)
	    {money += bet; won++;}
    else
        money -= bet;
    message.innerHTML = (win ? "Sie haben gewonnen! " : "Sie haben leider verloren. ") + why + 
           (money > 0 ? "<br>Neues Spiel?" : "<br>Leider besitzen Sie kein Geld mehr!");
    var lost=totalplays-won;		   
	document.getElementById("Total").innerHTML =""+totalplays;
	document.getElementById("Gewonnen").innerHTML =""+won;
	document.getElementById("Verloren").innerHTML =""+lost;
	document.getElementById("Gleichstand").innerHTML =""+tied;
    standButton.disabled = true;
    hitButton.disabled = true;
    newGameButton.disabled = true;
    gameInProgress = false;
    if (dealerCards[2].faceDown) {
       dealerCards[2].cardContainer.style.display = "none";
       dealerCards[2].setFaceUp();
       new Effect.SlideDown(dealerCards[2].cardContainer, { duration: 0.5, queue: "end" });
    }
    moneyDisplay.innerHTML = "Fr. " + money;
    if (money <= 0) {
        betInput.value = "Null!";
        }
        else {
        if (bet > money)
            betInput.value = money;
        standButton.disabled = true;
        hitButton.disabled = true;
        newGameButton.disabled = false;
        betInput.disabled = false;
        }
}

function dealersTurnAndEndGame() {
    message.innerHTML = "Die Reihe ist an der Bank...<br>&nbsp;";
    dealerCards[2].cardContainer.style.display = "none";
    dealerCards[2].setFaceUp();
    var takeNextCardOrFinish = function() {
       new Effect.SlideDown(dealerCards[dealerCards.count].cardContainer, {
          duration: 0.5,
          queue: "end",
          afterFinish: function() {
              var dealerTotal = getTotal(dealerCards);
              if (dealerCards.count < 5 && dealerTotal <= 16) {
                  dealerCards.count++;
                  dealerCards[dealerCards.count].setCard(deck.nextCard());
		          dealerCards[dealerCards.count].setFaceUp();
                  takeNextCardOrFinish();
              }
              else if (dealerTotal > 21)
                 endGame(true, "Bank hat über 21.");
              else if (dealerCards.count == 5)
                 endGame(false, "Bank hat 5 Karten ohne Total über 21.");
              else {
                 var playerTotal = getTotal(playerCards);
                 if (playerTotal > dealerTotal)
                    endGame(true, "Sie haben " + playerTotal + ". Bank hat " + dealerTotal + ".");
                 else if (playerTotal < dealerTotal)
                    endGame(false, "Sie haben " + playerTotal + ". Bank hat " + dealerTotal + ".");
                 else
				 {tied++; endGame(false, "Gleichstand mit " + playerTotal + ".");}
              }
          }
       });
    };
    takeNextCardOrFinish();
}

function hit() {
   if (!gameInProgress)
      return;
   standButton.disabled = true;
   hitButton.disabled = true;
   dealCard(playerCards, function() {
      var playerTotal = getTotal(playerCards);
      if (playerTotal > 21)
         endGame(false, "Sie haben über 21!");
      else if (playerCards.count == 5)
         endGame(true, "Sie haben 5 Karten ohne Total über 21.");
      else if (playerTotal == 21)
         dealersTurnAndEndGame();
      else {
         message.innerHTML = "Sie haben " + playerTotal + ". Neue Karte oder Deal?<br>&nbsp;";
         hitButton.disabled = false;
         standButton.disabled = false;
      }
   });
}

function stand() {
   if (!gameInProgress)
      return;
   hitButton.disabled = true;
   standButton.disabled = true;
   dealersTurnAndEndGame();
}