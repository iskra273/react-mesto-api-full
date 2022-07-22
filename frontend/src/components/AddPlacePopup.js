import React from 'react';
import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  // Обработчик установки названия места
  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  // Обработчик установки ссылки на картинку
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  // Обработчик сабмита формы добавления карточки
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name, 
      link: link
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('')
    }
  }, [isOpen]); 
 
  return (
    <div className="AddPlacePopup">
      <PopupWithForm
        name='add-element'
        title='Новое место'
        buttonText={'Создать'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
            id="name-input"
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={30}
            className="popup__input popup__input_name_add-name"
            placeholder="Название"
            onChange={handleNameChange}
            value={name}
          />
          <span
            id="error-name-input"
            className="popup__error popup__error_visible"
          />
          <input
            id="link-input"
            type="url"
            minLength={1}
            name="link"
            required
            className="popup__input popup__input_name_add-link"
            placeholder="Ссылка на картинку"
            onChange={handleLinkChange}
            value={link}
          />
          <span
            id="error-link-input"
            className="popup__error popup__error_visible"
          />
      </PopupWithForm>
    </div>  
  );
}
    
export default AddPlacePopup;