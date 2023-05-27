import { cardsData } from "./data.js";
import { sortByProperty, updateCards } from "./helpers.js";
import { injectCards, updateSortStatus } from "./helpers.js";

export const sortingOrder = {
  ascByName: {
    property: "name",
    order: "asc",
  },
  descByName: {
    property: "name",
    order: "desc",
  },
  ascByPrice: {
    property: "price",
    order: "asc",
  },
  descByPrice: {
    property: "price",
    order: "desc",
  },
};

function init() {
  injectCards(cardsData);

  const sortButtons = Array.from(document.querySelectorAll(".btn"));
  const sortByNameBtn = document.querySelector(".sort-by-name-btn");
  const sortByPriceBtn = document.querySelector(".sort-by-price-btn");

  sortByNameBtn.addEventListener("click", () => {
    const sortedCardsByNameAscending = sortByProperty(cardsData, sortingOrder.ascByName);

    updateSortStatus(sortByNameBtn, sortingOrder.ascByName.order);
    updateCards(sortedCardsByNameAscending);
  });

  sortByNameBtn.addEventListener("dblclick", () => {
    const sortedCardsByNameDescending = sortByProperty(cardsData, {
      property: "name",
      order: "desc",
    });

    updateSortStatus(sortByNameBtn, "desc");
    updateCards(sortedCardsByNameDescending);
  });

  sortByPriceBtn.addEventListener("click", () => {
    const sortedCardsByPriceAscending = sortByProperty(cardsData, {
      property: "price",
      order: "asc",
    });

    updateSortStatus(sortByPriceBtn, "asc");
    updateCards(sortedCardsByPriceAscending);
  });

  sortByPriceBtn.addEventListener("dblclick", () => {
    const sortedCardsByPriceDescending = sortByProperty(cardsData, {
      property: "price",
      order: "desc",
    });

    updateSortStatus(sortByPriceBtn, "desc");
    updateCards(sortedCardsByPriceDescending);
  });

  sortButtons.forEach(sortButton => {
    sortButton.addEventListener("click", () => {
      sortButtons.forEach(sortButton => {
        sortButton.classList.remove("btn-active");
        sortButton.classList.add("btn-inactive");
      });

      sortButton.classList.remove("btn-inactive");
      sortButton.classList.add("btn-active");
    });
  });
}

init();
