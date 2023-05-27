export function createCardImage(src, alt) {
  const cardImage = document.createElement("img");
  cardImage.className = "product-card__image";
  cardImage.src = src;
  cardImage.alt = alt;

  return cardImage;
}

export function createCardHeading(name) {
  const cardHeading = document.createElement("h3");
  cardHeading.className = "product-card__name";
  cardHeading.textContent = name;

  return cardHeading;
}

export function createCardPrice(price) {
  const cardPrice = document.createElement("p");
  cardPrice.className = "product-card__price";
  cardPrice.textContent = price;

  return cardPrice;
}

export function createCardComponent(card) {
  const productCard = document.createElement("article");
  productCard.className = "product-card fadein";
  productCard.setAttribute("tabindex", "0");
  productCard.setAttribute("aria-label", `product card ${card.alt} - ${card.price}`);

  productCard.appendChild(createCardImage(card.image, card.alt));
  productCard.appendChild(createCardHeading(card.name));
  productCard.appendChild(createCardPrice(card.price));

  return productCard;
}

export function sortByProperty(cards, { property, order }) {
  const cardsCopy = [...cards];
  const sortOrder = order === "asc" ? 1 : -1;
  return cardsCopy.sort((productA, productB) => {
    const sortedCards = productA[property].localeCompare(productB[property]);
    return sortedCards * sortOrder;
  });
}

export function injectCards(cards) {
  // duplicate ?
  const productsColumn = document.querySelector(".products-column");

  for (let i = 0; i < cards.length; i++) {
    const card = createCardComponent(cards[i]);
    productsColumn.appendChild(card);
  }
}

export function updateCards(cards) {
  const productsColumn = document.querySelector(".products-column");

  productsColumn.innerHTML = "";
  injectCards(cards);
}

export function updateSortStatus(btn, order) {
  const sortedByHeading = document.querySelector(".js-sorted-by");

  btn.classList.add(order === "asc" ? "btn-ascending" : "btn-descending");
  btn.classList.remove(order === "asc" ? "btn-descending" : "btn-ascending");
  sortedByHeading.textContent = `price (${order})`;
}
