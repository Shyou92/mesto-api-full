function isLoading(popupSelector, text) {
  const button = popupSelector.querySelector(".popup__submit");
  button.textContent = text;
}

function isLoaded(popupSelector, defaultText) {
  const button = popupSelector.querySelector(".popup__submit");

  button.textContent = defaultText;
}

export { isLoading, isLoaded };
