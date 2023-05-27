import { cardsData } from "./data.js";
import { sortByProperty, updateCards } from "./helpers.js";
import { injectCards, updateSortingStatus } from "./helpers.js";
import { sortingOptions } from "./constants.js";

function init() {
  injectCards(cardsData);

  const sortButtons = Array.from(document.querySelectorAll(".btn"));
  const sortByNameBtn = document.querySelector(".sort-by-name-btn");
  const sortByPriceBtn = document.querySelector(".sort-by-price-btn");

  sortByNameBtn.addEventListener("click", () => {
    const sortedCardsByNameAscending = sortByProperty(
      cardsData,
      sortingOptions.sortByNameAscending
    );
    updateSortingStatus(sortByNameBtn, sortingOptions.sortByNameAscending);
    updateCards(sortedCardsByNameAscending);
  });

  sortByNameBtn.addEventListener("dblclick", () => {
    const sortedCardsByNameDescending = sortByProperty(
      cardsData,
      sortingOptions.sortByNameDescending
    );

    updateSortingStatus(sortByNameBtn, sortingOptions.sortByNameDescending);
    updateCards(sortedCardsByNameDescending);
  });

  sortByPriceBtn.addEventListener("click", () => {
    const sortedCardsByPriceAscending = sortByProperty(
      cardsData,
      sortingOptions.sortByPriceAscending
    );

    updateSortingStatus(sortByPriceBtn, sortingOptions.sortByPriceAscending);
    updateCards(sortedCardsByPriceAscending);
  });

  sortByPriceBtn.addEventListener("dblclick", () => {
    const sortedCardsByPriceDescending = sortByProperty(
      cardsData,
      sortingOptions.sortByPriceDescending
    );

    updateSortingStatus(sortByPriceBtn, sortingOptions.sortByPriceDescending);
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
