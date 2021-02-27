function ImagePopup({ card, isOpened, onClose }) {
  return (
    <div className={`popup ${isOpened}`}>
      <div className='popup__container popup__container_content_image'>
        <img
          src={card ? card.link : ''}
          alt={card.name}
          className='popup__image'
        />
        <h3
          className='popup__title popup__title_content-heading'
          id='js__title'
        >
          {card.name}
        </h3>
        <button
          className='popup__close'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
