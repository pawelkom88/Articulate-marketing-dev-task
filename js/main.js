import { cardsData } from "./data.js";
// import Fuse from "../js/fuse.basic.min";

import {
  injectCards,
  updateSortingStatus,
  filterProducts,
  clearInputField,
  updateSortHeadingTextContent,
  sortByProperty,
} from "./helpers.js";
import { sortingOptions } from "./constants.js";

function init() {
  injectCards(sortByProperty(cardsData, {}));

  const sortButtons = Array.from(document.querySelectorAll(".btn"));
  const sortByNameBtn = document.querySelector(".sort-by-name-btn");
  const sortByPriceBtn = document.querySelector(".sort-by-price-btn");
  const inputField = document.querySelector("#search-box");
  const clearInputFieldIcon = document.querySelector(".clear-input-field");

  let queriedProducts = cardsData;

  clearInputField(inputField);

  const queryOptions = { inputValue: "", sort: { property: "name", order: 1 } };

  const { sortByNameAscending, sortByNameDescending, sortByPriceAscending, sortByPriceDescending } =
    sortingOptions;

  sortByNameBtn.addEventListener("click", () => {
    queryOptions.sort = sortByNameAscending;

    const sortedCardsByNameAscending = sortByProperty(queriedProducts, sortByNameAscending);

    updateSortingStatus(sortByNameBtn, sortByNameAscending);

    injectCards(sortedCardsByNameAscending);
  });

  sortByNameBtn.addEventListener("dblclick", () => {
    queryOptions.sort = sortByNameDescending;

    const sortedCardsByNameDescending = sortByProperty(queriedProducts, sortByNameDescending);

    updateSortingStatus(sortByNameBtn, sortByNameDescending);
    injectCards(sortedCardsByNameDescending);
  });

  sortByPriceBtn.addEventListener("click", () => {
    queryOptions.sort = sortByPriceAscending;

    const sortedCardsByPriceAscending = sortByProperty(queriedProducts, sortByPriceAscending);

    updateSortingStatus(sortByPriceBtn, sortByPriceAscending);
    injectCards(sortedCardsByPriceAscending);
  });

  sortByPriceBtn.addEventListener("dblclick", () => {
    queryOptions.sort = sortByPriceDescending;

    const sortedCardsByPriceDescending = sortByProperty(queriedProducts, sortByPriceDescending);

    updateSortingStatus(sortByPriceBtn, sortByPriceDescending);
    injectCards(sortedCardsByPriceDescending);
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

  inputField.addEventListener("input", e => {
    queryOptions.inputValue = e.target.value;

    if (queryOptions.inputValue.length > 0) {
      clearInputFieldIcon.style.setProperty("--opacity", 1);
      clearInputFieldIcon.setAttribute("tabindex", "0");
    } else {
      clearInputFieldIcon.style.setProperty("--opacity", 0);
    }

    queriedProducts = filterProducts(cardsData, queryOptions.inputValue);

    const sortedProductsByQueryOption = sortByProperty(queriedProducts, queryOptions.sort);

    updateSortHeadingTextContent(sortedProductsByQueryOption.length);

    injectCards(sortedProductsByQueryOption);
  });

  clearInputFieldIcon.addEventListener("click", () => {
    clearInputField(inputField);
    updateSortHeadingTextContent(cardsData.length);
    injectCards(sortByProperty(cardsData, queryOptions.sort));
  });

  ///////////////////////////////////////////////////
  console.log(queryOptions.sort);

  // const fuse = new Fuse(cardsData, {
  //   keys: ["title", "author.firstName"],
  // });

  // fuse.search("");
}

init();
