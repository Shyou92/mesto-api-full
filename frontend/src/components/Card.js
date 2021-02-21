import React from 'react';
import { CurrentUserContext } from '../contexts/СurrentUserContext';

function Card(item) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwnCard = item.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwnCard ? '' : 'element__delete_isHidden'
  }`;
  const isLiked = item.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? 'element__like_state_active' : ''
  }`;

  function handleClick() {
    item.onCardClick(item.card);
  }

  function handleLikeClick() {
    item.onCardLike(item.card);
  }

  function handleDeleteCard() {
    item.onCardDelete(item.card);
  }

  return (
    <div className='element'>
      <img
        src={item.card.link}
        alt={item.card.name}
        className='element__photo'
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteCard}
      ></button>
      <div className='element__container'>
        <h2 className='element__heading'>{item.card.name}</h2>
        <div className='element__like-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          ></button>
          <span className='element__like-counter'>
            {item.card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
