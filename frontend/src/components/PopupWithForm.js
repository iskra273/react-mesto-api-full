import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, children, buttonText, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened`: ""}`} >
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose}/>
        <form name={name} className="popup__form" noValidate="" onSubmit={onSubmit}>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type = "submit" className="popup__save">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;