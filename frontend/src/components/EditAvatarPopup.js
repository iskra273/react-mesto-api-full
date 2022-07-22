import React from 'react';
import {useState, useEffect, useContext, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef('');
  
  //Очистка поля ввода аватара после закрытия попапа
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  // Обработчик сабмита формы редактирования аватара
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <div className="EditAvatarPopup">
        <PopupWithForm
          name={'avatar'}
          title={'Обновить автар'}
          buttonText={'Сохранить'}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            ref={avatarRef}
            className="popup__input popup__input_name_add-link"
            id="img-input"
            type="url"
            minLength={1}
            name="avatar"
            required
            placeholder="Ссылка на картинку"
          />
          <span
            id="error-img-input"
            className="popup__error popup__error_visible"
          />      
        </PopupWithForm>
    </div>  
  );
}
    
export default EditAvatarPopup;