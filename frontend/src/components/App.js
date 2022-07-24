import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { auth } from '../utils/auth.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';



function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
 
 // Стейт авторизации пользователя (true - вошел в систему)
  const [loggedIn, setLoggedIn] = useState(false);

 // Стейт состояния открытия попапа при регистрациии
 const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

 // Стейт сообщения об успешной или нейспешной авторизации
 const [message, setMessage] = useState(false);

 // Стейт отображения логина в хедере
 const [userEmailHeader, setUserEmailHeader] = useState('');
 
 const history = useHistory();

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      api.getProfile()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.error(err);
      })
    
    
      api.getInitialCards()
        .then((res) => setCards(res))
        .catch((err) => {
          console.error(err);
      })
    }
    }, [loggedIn]);
  
  

  // Открытие попапа редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  // Открытие попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  // Открытие попапа добавления места
  function  handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  // Закрытие попапа
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  // Обработчик клика по изображению
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleSetCads (updatedCards) {
    setCards(updatedCards)
  }

  function handleUpdateUser(data) {
    api.editProfile(data.name, data.about)
    .then((newProfile) => {
      setCurrentUser(newProfile);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data.avatar)
    .then((avatar) => {
      setCurrentUser({ ...currentUser, avatar });
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card.name, card.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  //Функция постановки лайков
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    function handleLikeStatus(newCard) {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }

    if (!isLiked) {
      api.addLike(card._id)
        .then(handleLikeStatus)
        .catch((err) => {
          console.error(err);
        });
    } else {
      api.deleteLike(card._id)
        .then(handleLikeStatus)
        .catch((err) => {
          console.error(err);
        });
    } 
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
        .then (() => {
          setCards(cards => cards.filter(item => item._id !== card._id)) 
        })
        .catch((err) => {
            console.log(err);
        })
  }

  // Обработчик регистрации
  function onRegister(email, password) {
    auth.register(password, email)
      .then((res) => {
        setIsInfoTooltipOpen(true)
        if(res) {
          setMessage(true);
          history.push('/signin');
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // Обработчик авторизации
  function onLogin(email, password) {
    auth.authorize(password, email)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setUserEmailHeader(email);
          localStorage.setItem('jwt', res.token)
          history.push('/');
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // Проверка токена
  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if(token) {
      auth.validityToken(token)
      .then((res) => {
        if(res) {
          setUserEmailHeader(res.email)
        };
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err)
      });  
    }
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    history.push('/signin');
    setLoggedIn(false);
  }

  //Проверка токена при первой загрузке
  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push("/"); 
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="content">
            <Header
              userEmailHeader={userEmailHeader}
              onSignOut={onSignOut}
            />
            <Switch>
              <ProtectedRoute
                onEditAvatar={handleEditAvatarClick} 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onSetCards={handleSetCads}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                component={Main}
                exact path="/"
                loggedIn={loggedIn}
              />
              
              <ProtectedRoute
                component={Footer}
                exact path="/"
                loggedIn={loggedIn}               
              />
              
              <Route path="/signin">
                <Login onLogin={onLogin} />   
              </Route>
              
              <Route path="/signup">
                <Register onRegister={onRegister} />   
              </Route>
              
              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
              </Route>

            </Switch> 

            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              status={message}
            />

            <EditProfilePopup 
              isOpen={isEditProfilePopupOpen} 
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen} 
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup 
              isOpen={isAddPlacePopupOpen} 
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup
              card={isSelectedCard}
              onClose={closeAllPopups}
            />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider> 
  );
}

export default App;
