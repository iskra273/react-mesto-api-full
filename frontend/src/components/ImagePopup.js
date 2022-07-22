function ImagePopup({onClose, card}) {
    return (
      <div className={`popup popup_type_image-element ${card && `popup_opened`}`}>
        <div className="popup__container-image">
            <button type="button" className="popup__close" onClick={onClose}/>
            <figure className="popup__image">
              <img src={card?.link} alt={card?.name} className="popup__image-element" />
              <p className="popup__caption">{card ? card.name:""}</p>
            </figure>
          </div>
      </div>
    );
}
  
export default ImagePopup;