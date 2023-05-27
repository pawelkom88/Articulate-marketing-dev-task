import { cardsData } from "./data.js";
import { sortByProperty, updateCards } from "./helpers.js";
import { injectCards } from "./helpers.js";

function init() {
  injectCards(cardsData);

  const sortByNameBtn = document.querySelector(".sort-by-name-btn");
  const sortByPriceBtn = document.querySelector(".sort-by-price-btn");

  sortByNameBtn.addEventListener("click", () => {
    const sortedCardsByNameAscending = sortByProperty(cardsData, {
      property: "name",
      order: "asc",
    });

    updateCards(sortedCardsByNameAscending);
  });

  sortByNameBtn.addEventListener("dblclick", () => {
    const sortedCardsByNameDescending = sortByProperty(cardsData, {
      property: "name",
      order: "desc",
    });

    updateCards(sortedCardsByNameDescending);
  });

  sortByPriceBtn.addEventListener("click", () => {
    const sortedCardsByPriceAscending = sortByProperty(cardsData, {
      property: "price",
      order: "asc",
    });

    updateCards(sortedCardsByPriceAscending);
  });

  sortByPriceBtn.addEventListener("dblclick", () => {
    const sortedCardsByPriceDescending = sortByProperty(cardsData, {
      property: "price",
      order: "desc",
    });

    updateCards(sortedCardsByPriceDescending);
  });
}

init();
