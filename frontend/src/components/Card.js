import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


//После запроса в API, обновите стейт cards с помощью метода filter: создайте копию массива, исключив из него удалённую карточку.

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  
  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = card.likes.some(i => i._id === currentUser._id);
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  );

  function handleClick() {
    onCardClick(card);
  } 

  function handleLikeClick() {
    onCardLike(card)
  }
  
  function handleDeleteClick() {
    onCardDelete(card);
  } 

  return (
    <div className="Card">
      <div className="element-template">
        <div className="element">
          <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>
          <img className="element__image" src={card.link} alt={card.name}  onClick={handleClick}/>
          <div className="element__title">
            <h2 className="element__name">{card.name}</h2>
            <div className="element__like-container">
              <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
              <span className="element__like-count">{card.likes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
  
export default Card;