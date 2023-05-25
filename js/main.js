import { cardsData } from "./constants.js";

("use strict");

function createCardImage(src, alt) {
  let cardImage = document.createElement("img");
  cardImage.className = "product-card__image";
  cardImage.src = src;
  cardImage.alt = alt;

  return cardImage;
}

function createCardHeading(name) {
  let cardHeading = document.createElement("h3");
  cardHeading.className = "product-card__name";
  cardHeading.textContent = name;

  return cardHeading;
}

function createCardPrice(price) {
  let cardPrice = document.createElement("p");
  cardPrice.className = "product-card__price";
  cardPrice.textContent = price;

  return cardPrice;
}

function createCardComponent(card) {
  const productCard = document.createElement("article");
  productCard.className = "product-card";

  productCard.appendChild(createCardImage(card.image, card.alt));
  productCard.appendChild(createCardHeading(card.name));
  productCard.appendChild(createCardPrice(card.price));

  return productCard;
}

function injectCards(cards) {
  const productsColumn = document.querySelector(".products-column");

  for (let i = 0; i < cards.length; i++) {
    let cardElement = createCardComponent(cards[i]);
    productsColumn.appendChild(cardElement);
  }
}

injectCards(cardsData);
