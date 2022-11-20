const cards = document.querySelectorAll('.card');

let hasFlipedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
  if(lockBoard) return;
  if(this == firstCard) return;
  this.classList.add('flip');
  if(!hasFlipedCard){
    hasFlipedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlipedCard = false;
  checkForMath();

}

function checkForMath(){
  if(firstCard.dataset.card === secondCard.dataset.card){
    disableCard();
    return;
  }

  unflipCards();
}

function disableCard(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards(){
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard(){
  [hasFlipedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle(){
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
})