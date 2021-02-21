import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpened, onClose, onAddPlace }) {
  const addTitleRef = React.useRef();
  const addPlaceRef = React.useRef();

  function handleTitleSubmit(e) {
    e.preventDefault();
    onAddPlace(addTitleRef.current.value, addPlaceRef.current.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="addNewPlace"
      modifier="content_text"
      isOpened={isOpened}
      buttonTextContent="Добавить"
      onSubmit={handleTitleSubmit}
      onClose={onClose}
    >
      <section className="popup__form-section">
        <input
          type="text"
          ref={addTitleRef}
          required
          className="popup__input popup__input_title"
          id="create-title-popup"
          minLength="2"
          maxLength="30"
          name="name"
          placeholder="Название"
        />
        <span
          className="popup__input_error"
          id="create-title-popup-error"
        ></span>
      </section>
      <section className="popup__form-section">
        <input
          type="url"
          ref={addPlaceRef}
          required
          className="popup__input popup__input_link"
          id="create-link-popup"
          name="link"
          placeholder="Ссылка на картинку"
        />
        <span
          className="popup__input_error"
          id="create-link-popup-error"
        ></span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
