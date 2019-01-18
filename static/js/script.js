let numOfImages = 9;
let counter = 0;

// Populate array with image paths
let orderedImageArray = arrOfImages(numOfImages);

// Shuffle array
let shuffledImageArray = shuffleCards(orderedImageArray);

// Display cards with shuffled array
displayCards(shuffledImageArray);

// Hide cards
shuffledImageArray.forEach((val, index) => {
  hideACard(index);
});

function sayYouWon() {
  alert("You win!");
}

const cards = document.getElementsByClassName("card");
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", revealCard);
}

let cardsPicked = [];

///////////////////////////
// FUNCTION DECLARATIONS //
///////////////////////////

function arrOfImages(num) {
  let imageArray = [];
  for (let i = 1; i <= num; i++) {
    imageArray.push(`0${i}.jpg`);
  }
  // Make a copy of the array
  let imageArray2 = imageArray;
  // Double the array so there are two copies of each image
  let doubledArray = imageArray.concat(imageArray2);
  // return ["01.jpg"..."09.jpg", "01.jpg"..."09.jpg"]
  return doubledArray;
}

function shuffleCards(arr) {
  for (let i = 0; i < arr.length; i++) {
    // get 2 random index values
    let index1 = Math.floor(Math.random() * arr.length);
    let index2 = Math.floor(Math.random() * arr.length);

    // swap them in the array
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
  }
  // return (randomly) ["05.jpg","01.jpg"..."09.jpg", "05.jpg"]
  return arr;
}

function displayCards(arr) {
  const container = document.getElementById("container");

  for (let i = 0; i < arr.length; i++) {
    let newImgElement = document.createElement("img");
    newImgElement.src = "static/images/" + arr[i];
    newImgElement.id = i;
    newImgElement.className = "card";
    container.appendChild(newImgElement);
  }
}

function hideACard(index) {
  // get the image with the specified index
  let specificCard = document.getElementById(index);
  // set the image's source to the question mark
  specificCard.src = "static/images/questionmark.jpg";
}

function revealCard(event) {
  // Disable selecting more than two cards at once
  if (cardsPicked.length < 2) {
    let clickedImageId = event.target.id;

    let clickedImage = document.getElementById(clickedImageId);

    clickedImage.src = "static/images/" + shuffledImageArray[clickedImageId];

    // add the clicked image to cardsPicked array
    cardsPicked.push(clickedImage.id);

    // if 2 cards have been picked
    if (cardsPicked.length == 2) {
      // if the two selected images are the same
      if (
        shuffledImageArray[cardsPicked[0]] == shuffledImageArray[cardsPicked[1]]
      ) {
        // reset the cardsPicked array
        cardsPicked = [];
        counter++;
        if (counter === numOfImages) {
          window.setTimeout(sayYouWon, 200);
        }
      } else {
        // make a function that will flip the cards back over
        var hidePickedCards = function() {
          hideACard(cardsPicked[0]);
          hideACard(cardsPicked[1]);
          cardsPicked = [];
        };
        window.setTimeout(hidePickedCards, 1000);
      }
    }
  }
}

// Check if firstClick.src === secondClick.src
