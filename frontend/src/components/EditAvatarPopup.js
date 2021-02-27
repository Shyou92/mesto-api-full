import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/СurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar
    });
  }

  useEffect(() => {
    if (currentUser) {
      setAvatar(currentUser.avatar || '');
    }
  }, [currentUser])

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
          required
          className="popup__input popup__input-update"
          id="edit-ava-popup"
          name="update"
          placeholder="Обновимся?"
          onChange={handleChangeAvatar}
        />
        <span className="popup__input_error" id="edit-ava-popup-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
