const cards = document.querySelectorAll(".Card");
const winCard = document.querySelector(".winAlert");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;

function flipCard(e) {
  if (disableDeck) return;
  let clickedCard = e.currentTarget;
  if (clickedCard === cardOne) return;
  clickedCard.classList.add("flip");

  if (clickedCard !== cardOne && !disableDeck) {
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
    // console.log(cardOne, cardTwo);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 8) {
      return showWinAlert();
      //Game END
      // setTimeout(() => {

      //   return shaffleCard();
      // }, 2000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    console.log("Cards matched");
    return (disableDeck = false);
  } else {
    console.log("Cards not matched");
    disableDeck = true;
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1000);
  }
}

function shaffleCard() {
  hideWinAlert();
  matchedCard = 0;
  cardOne = cardTwo = "";
  disableDeck = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, index) => {
    card.classList.remove("flip", "shake");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

function showWinAlert() {
  winCard.classList.remove("hidden");
  setTimeout(() => {
    winCard.classList.remove("opacity-0");
    winCard.classList.add("opacity-100");
  }, 10);
}

function hideWinAlert() {
  if (!winCard.classList.contains("hidden")) {
    winCard.classList.remove("opacity-100");
    winCard.classList.add("opacity-0");
    setTimeout(() => {
      winCard.classList.add("hidden");
    }, 700);
  }
}

shaffleCard();
