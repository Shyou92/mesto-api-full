import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/СurrentUserContext';

function EditProfilePopup({ isOpened, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [currentUser]);

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='editProfile'
      modifier='content_text'
      isOpened={isOpened}
      buttonTextContent='Сохранить'
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <section className='popup__form-section'>
        <input
          type='text'
          required
          className='popup__input popup__input_name'
          id='edit-name-popup'
          minLength='2'
          maxLength='40'
          name='name'
          placeholder='Имя'
          value={name}
          onChange={handleChangeName}
        />
        <span className='popup__input_error' id='edit-name-popup-error'></span>
      </section>
      <section className='popup__form-section'>
        <input
          type='text'
          required
          className='popup__input popup__input_job'
          id='edit-job-popup'
          minLength='2'
          maxLength='200'
          name='about'
          placeholder='Профессия'
          value={description}
          onChange={handleChangeDescription}
        />
        <span className='popup__input_error' id='edit-job-popup-error'></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
