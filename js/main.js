import { cardsData } from "./data.js";
import { debounce, sortByProperty, updateCards } from "./helpers.js";
import { injectCards, updateSortingStatus, filterProducts } from "./helpers.js";
import { sortingOptions } from "./constants.js";

function init() {
  injectCards(cardsData);

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

    const gridTemplateColumns = document.querySelector(".products-column");
    const filterLabel = document.querySelector(".products-grid__heading");
    const mediaQuery = window.matchMedia("(min-width: 480px)");

    // const debouncedTypedValue = debounce(filterProducts(cardsData, typedValue));

    //extract to a function ??

    const filteredProducts = filterProducts(cardsData, typedValue);

    if (filteredProducts.length < 4 && mediaQuery.matches) {
      gridTemplateColumns.style.gridTemplateColumns = "1fr 1fr 1fr";
    }

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
