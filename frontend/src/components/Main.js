import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
   
  return (
    <div className="Main">
      <main>
          <section className="profile">
            <div className="profile__avatar-edit">
              <img
                src={currentUser.avatar}
                alt="Фото профиля"
                className="profile__avatar-foto"
              />
              <button className="profile__avatar-foto-edit" onClick={onEditAvatar} />
            </div>
            <div className="profile__info">
              <div className="profile__title">
                <h1 className="profile__info-title">{currentUser.name}</h1>
                <button type="button" className="profile__edit" onClick={onEditProfile}/>
              </div>
              <p className="profile__info-subtitle">{currentUser.about}</p>
            </div>
            <button type="button" className="profile__add" onClick={onAddPlace}></button>
          </section>
          
          <section className="elements" >
            {cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
            ))}
          </section>
      </main>
    </div>
  );
}
  
export default Main;