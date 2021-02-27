import React from 'react';
import Card from './Card';
import Footer from './Footer';
import { Route } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/СurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  сards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <img
          src={currentUser.avatar}
          className='profile__image'
          name='avatar'
          alt='Аватарка'
        />
        <button className='profile__edit' onClick={onEditAvatar}></button>

        <div className='profile__info'>
          <h2 className='profile__info-name'>{currentUser.name}</h2>
          <button
            className='profile__info-edit'
            onClick={onEditProfile}
          ></button>
          <p className='profile__info-job'>{currentUser.about}</p>
        </div>
        <button className='profile__add-button' onClick={onAddPlace}></button>
      </section>

      <section className='elements'>
        {сards.map((item) => {
          return (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
      <Route component={Footer} />
    </main>
  );
}

export default Main;
