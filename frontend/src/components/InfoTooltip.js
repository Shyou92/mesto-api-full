import successTip from '../images/Union.svg';
import failTip from '../images/Fail.svg';

function InfoTooltip({ isOpened, onClose, resStatus }) {
  return (
    <div className={`popup ${isOpened ? 'popup_is-opened' : ''}`}>
      <div className='popup__container popup__container_reg-response'>
        <img
          src={resStatus === 201 ? successTip : failTip}
          alt='статус'
          className='popup__reg-image'
        />
        <h2 className='popup__title popup__reg-title'>
          {resStatus === 201
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        <button className='popup__close' onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
