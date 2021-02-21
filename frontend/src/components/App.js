import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  withRouter,
  Redirect,
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as authApi from '../utils/authApi';
import { CurrentUserContext } from '../contexts/СurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const [resStatus, setResStatus] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      tokenCheck(jwt);
      setUserData(userData);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  };

  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  };

  const onRegisterPopup = () => {
    setIsRegistrationPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsRegistrationPopupOpen(false);
  };

  const handleCurrentUser = (data) => {
    setCurrentUser(data);
  };

  const handleLikeCard = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .setLike(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((error) => console.log(error));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((deletedCard) => {
        const rerenderInitialCards = cards.filter((c) => c._id !== card._id);
        setCards(rerenderInitialCards);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateAvatar = (data) => {
    api
      .setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleAddPlaceSubmit = (data, link) => {
    api
      .addCard(data, link)
      .then((res) => {
        setCards([res, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleRegister = (data) => {
    const { email, password } = data;
    return authApi
      .register(email, password)
      .then((res) => {
        setResStatus(res.status);
        if (!res || res.status === 400) {
          return (res.status = 400);
        }
        if (res) {
          return res;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (data) => {
    const { email, password } = data;
    return authApi
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          tokenCheck(res.token);
          setUserData(userData);
          setResStatus(null);
          localStorage.setItem('jwt', res.token);
        }
        return res;
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setUserData('');
  };

  const tokenCheck = (jwt) => {
    authApi
      .getContent(jwt)
      .then((res) => {
        if (jwt !== localStorage.getItem('jwt')) {
          throw new Error('Переданный токен некорректен');
        }
        if (!res) {
          throw new Error('Токен не передан или передан не в том формате');
        }
        if (res) {
          let userEmail = res.data.email;
          setLoggedIn(true);
          setUserData(userEmail);
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([res, data]) => {
        handleCurrentUser(res);
        setCards(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <CurrentUserContext.Provider value={currentUser}>
          <div className='page'>
            <Header handleSignOut={handleSignOut} userData={userData} />
            <Switch>
              <Route path='/sign-in'>
                <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
              </Route>

              <Route path='/sign-up'>
                <Register
                  onRegister={handleRegister}
                  onRegisterPopup={onRegisterPopup}
                />
              </Route>

              <ProtectedRoute
                exact
                path='/'
                loggedIn={loggedIn}
                userData={userData}
                component={Main}
                onEditAvatar={onEditAvatar}
                onEditProfile={onEditProfile}
                onAddPlace={onAddPlace}
                onCardClick={handleCardClick}
                сards={cards}
                onCardLike={handleLikeCard}
                onCardDelete={handleCardDelete}
              />
            </Switch>
            <Route>
              {loggedIn ? <Redirect to='/' /> : <Redirect to='sign-in' />}
            </Route>
            <EditAvatarPopup
              isOpened={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
              isOpened={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpened={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup
              card={selectedCard || {}}
              isOpened={selectedCard && 'popup_is-opened'}
              onCardClick={handleCardClick}
              onClose={closeAllPopups}
            />

            <InfoTooltip
              isOpened={isRegistrationPopupOpen}
              onClose={closeAllPopups}
              resStatus={resStatus}
            />
          </div>
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default withRouter(App);
