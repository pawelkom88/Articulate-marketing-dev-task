import { cardsData } from "./data.js";
import {
  injectCards,
  updateSortingStatus,
  clearInputField,
  updateSortHeadingTextContent,
  sortCardsByProperty,
  sortCards,
} from "./helpers.js";
import { sortingOptions } from "./config.js";

const options = {
  isCaseSensitive: false,
  keys: ["name"],
};

const fuse = new Fuse(cardsData, options);

function init() {
  injectCards(sortCardsByProperty(cardsData, {}));

  const sortButtons = Array.from(document.querySelectorAll(".btn"));
  const sortByNameBtn = document.querySelector(".sort-by-name-btn");
  const sortByPriceBtn = document.querySelector(".sort-by-price-btn");
  const inputField = document.querySelector("#search-box");
  const clearInputFieldIcon = document.querySelector(".clear-input-field");

  let queriedProducts = cardsData;

  let queryOptions = { inputValue: "", sort: { property: "name", order: 1 } };

  clearInputField(queryOptions);

  const { sortByNameAscending, sortByNameDescending, sortByPriceAscending, sortByPriceDescending } =
    sortingOptions;

  sortButtons.forEach(sortButton => {
    sortButton.addEventListener("click", () => {
      switch (sortButton) {
        case sortByNameBtn:
          queryOptions.sort = sortByNameAscending;
          updateSortingStatus(sortByNameBtn, sortByNameAscending);
          break;
        case sortByPriceBtn:
          queryOptions.sort = sortByPriceAscending;
          updateSortingStatus(sortByPriceBtn, sortByPriceAscending);
          break;
      }
      sortCards(queriedProducts, queryOptions.sort);

      sortButtons.forEach(sortButton => {
        sortButton.classList.remove("btn-active");
        sortButton.classList.add("btn-inactive");
      });
      sortButton.classList.remove("btn-inactive");
      sortButton.classList.add("btn-active");
    });

    sortButton.addEventListener("dblclick", () => {
      switch (sortButton) {
        case sortByNameBtn:
          queryOptions.sort = sortByNameDescending;
          updateSortingStatus(sortByNameBtn, sortByNameDescending);
          break;
        case sortByPriceBtn:
          queryOptions.sort = sortByPriceDescending;
          updateSortingStatus(sortByPriceBtn, sortByPriceDescending);
          break;
      }
      sortCards(queriedProducts, queryOptions.sort);
    });
  });

  inputField.addEventListener("input", e => {
    queryOptions.inputValue = e.target.value;

    if (queryOptions.inputValue.length > 0) {
      queriedProducts = fuse.search(queryOptions.inputValue).map(({ item }) => item);

      clearInputFieldIcon.style.setProperty("--opacity", 1);
      clearInputFieldIcon.setAttribute("tabindex", "0");
    } else {
      queriedProducts = sortCardsByProperty(cardsData, {});
      clearInputFieldIcon.style.setProperty("--opacity", 0);
    }

    injectCards(queriedProducts);
  });

  clearInputFieldIcon.addEventListener("click", handleClearInputFieldIconClick);

  clearInputFieldIcon.addEventListener("keydown", e => {
    const { key } = e;
    if (key == "Enter") handleClearInputFieldIconClick();
  });

  let lastEnterTime = 0;

  const maxInterval = 500;

  sortButtons.forEach(sortButton => {
    sortButton.addEventListener("keydown", e => {
      const { key } = e;

      if (key == "Enter") {
        const currentTime = new Date().getTime();
        sortCards(queriedProducts, sortByNameAscending);

        if (currentTime - lastEnterTime < maxInterval) {
          console.log("double enetr detected");
          sortCards([], sortByNameDescending);
        }

        lastEnterTime = currentTime;
      }
    });
  });

  function handleClearInputFieldIconClick() {
    clearInputField(queryOptions);
    updateSortHeadingTextContent(cardsData.length);
    queriedProducts = sortCardsByProperty(cardsData, {});
    injectCards(sortCardsByProperty(queriedProducts, queryOptions.sort));
  }
}

init();
