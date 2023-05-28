import { cardsData } from "./data.js";
import { debounce, sortByProperty, updateCards } from "./helpers.js";
import { injectCards, updateSortingStatus, filterProducts } from "./helpers.js";
import { sortingOptions } from "./constants.js";

function init() {
  injectCards(sortByProperty(cardsData, sortingOptions.sortByNameAscending));

  const sortButtons = Array.from(document.querySelectorAll(".btn"));
  const sortByNameBtn = document.querySelector(".sort-by-name-btn");
  const sortByPriceBtn = document.querySelector(".sort-by-price-btn");
  const inputValue = document.querySelector("#search-box");

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

  inputValue.addEventListener("keyup", e => {
    const typedValue = e.target.value;

    const filterLabel = document.querySelector(".products-grid__heading");

    //extract to a function ??

    const filteredProducts = filterProducts(cardsData, typedValue);

    // handleResolutionChange(filteredProducts.length < 4, breakpoint);

    if (filteredProducts.length === 0) {
      filterLabel.textContent = "No results found";
    } else {
      filterLabel.textContent = "Sorted by";
    }

    // two different array - make it one for all funcs (card data, sortedProducts)
    updateCards(filteredProducts);
  });
}

init();
