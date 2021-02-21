import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editAvatar"
      modifier="content_text popup__container_update"
      isOpened={isOpened}
      buttonTextContent="Сохранить"
      onSubmit={handleSubmit}
      onClose={onClose}
      onHandleSubmit={handleSubmit}
    >
      <section className="popup__form-section">
        <input
          type="url"
          ref={avatarRef}
          required
          className="popup__input popup__input-update"
          id="edit-ava-popup"
          name="update"
          placeholder="Обновимся?"
        />
        <span className="popup__input_error" id="edit-ava-popup-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
