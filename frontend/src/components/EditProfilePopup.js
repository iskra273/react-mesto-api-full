import React from 'react';
import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  // Стейты имени и описания пользователя
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  //Установка знечений в инпуты
  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]); 


  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description
    });
  }

  // Изменение имени
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  // Изменение описания
  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  }

  return (
    <div className="EditProfilePopup">
      <PopupWithForm
        name={'edit'}
        title={'Редактировать профиль'}
        buttonText={'Сохранить'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
            id="title-input"
            type="text"
            name="title"
            required
            minLength={2}
            maxLength={40}
            className="popup__input popup__input_name_title"
            placeholder="Имя"
            value={name}
            onChange={handleNameChange}
          />
          <span
            id="error-title-input"
            className="popup__error popup__error_visible"
          />
          <input
            id="subtitle-input"
            type="text"
            name="subtitle"
            required
            minLength={2}
            maxLength={200}
            className="popup__input popup__input_name_subtitle"
            placeholder="Профессиональная деятельность"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span
            id="error-subtitle-input"
            className="popup__error popup__error_visible"
          />            
      </PopupWithForm>
    </div>  
  );
}
    
export default EditProfilePopup;