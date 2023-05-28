import { sortingOptions } from "./constants.js";

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
  const productCard = document.createElement("div");
  productCard.className = "product-card fadein";
  productCard.setAttribute("tabindex", "0");
  productCard.setAttribute("aria-label", `product card ${card.alt} - ${card.price}`);

  productCard.appendChild(createCardImage(card.image, card.alt));
  productCard.appendChild(createCardHeading(card.name));
  productCard.appendChild(createCardPrice(card.price));

  return productCard;
}

export function sortByProperty(cards, { property = "name", order = 1 }) {
  const cardsCopy = [...cards];

  return cardsCopy.sort((productA, productB) => {
    return (
      productA[property].localeCompare(productB[property], undefined, {
        numeric: true,
        sensitivity: "base",
      }) * order
    );
  });
}

export function injectCards(cards) {
  const productsColumn = document.querySelector(".products-column");
  productsColumn.innerHTML = "";

  cards.forEach(card => productsColumn.appendChild(createCardComponent(card)));
}

export function updateSortingStatus(btn, { property = "name", order = "asc" }) {
  const sortedByHeading = document.querySelector(".js-sorted-by");

  btn.classList.add(order === 1 ? "btn-ascending" : "btn-descending");
  btn.classList.remove(order === 1 ? "btn-descending" : "btn-ascending");
  sortedByHeading.textContent = `${property} (${order})`;
}

export function filterProducts(data, input) {
  return data.filter(card => card.name.toLowerCase().includes(input.toLowerCase()));
}

// export function debounce(callback, timeout = 1000) {
//   let timeoutId = null;
//   return (...args) => {
//     console.log(...args);
//     window.clearTimeout(timeoutId);
//     timeoutId = window.setTimeout(() => {
//       callback.apply(null, args);
//     }, timeout);
//   };
// }

export function clearInputField(element) {
  const clearInputFieldIcon = document.querySelector(".clear-input-field");

  clearInputFieldIcon.style.setProperty("--opacity", 0);
  element.value = "";
}

export function updateSortHeadingTextContent(products) {
  const sortHeading = document.querySelector(".content");
  const filterLabel = document.querySelector(".js-sorted-by");

  if (products === 0) {
    sortHeading.textContent = "No results found";
    filterLabel.textContent = "";
  } else {
    sortHeading.textContent = "Sorted by ";
    filterLabel.textContent = `${sortingOptions.sortByNameAscending.property} (${sortingOptions.sortByNameAscending.order})`;
  }
}
