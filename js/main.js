import { cardsData } from "./data.js";
import { debounce, sortByProperty, updateCards } from "./helpers.js";
import {
  injectCards,
  updateSortingStatus,
  filterProducts,
  clearInputField,
  updateSortHeadingTextContent,
} from "./helpers.js";
import { sortingOptions } from "./constants.js";

function init() {
  injectCards(sortByProperty(cardsData, sortingOptions.sortByNameAscending));

  const sortButtons = Array.from(document.querySelectorAll(".btn"));
  const sortByNameBtn = document.querySelector(".sort-by-name-btn");
  const sortByPriceBtn = document.querySelector(".sort-by-price-btn");
  const inputValue = document.querySelector("#search-box");
  const filterProductsContainer = document.querySelector(".filter-products");

  clearInputField(inputValue);

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
    e.stopPropagation();

    const typedValue = e.target.value;

    //extract to a function ??

    if (typedValue.length > 0) {
      filterProductsContainer.style.setProperty("--opacity", 1);
      filterProductsContainer.setAttribute("tabindex", "0");
    } else {
      filterProductsContainer.style.setProperty("--opacity", 0);
    }
    const filteredProducts = filterProducts(cardsData, typedValue);

    updateSortHeadingTextContent(filteredProducts.length);

    // two different array - make it one for all funcs (card data, sortedProducts)
    updateCards(filteredProducts);
  });

  filterProductsContainer.addEventListener("change", () => {
    clearInputField(inputValue);
    updateSortHeadingTextContent(cardsData.length);
    updateCards(sortByProperty(cardsData, sortingOptions.sortByNameAscending));
  });
}

init();
