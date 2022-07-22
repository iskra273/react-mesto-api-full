import React from 'react';
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function InfoTooltip({onClose, isOpen, status}) {
    return (
        <div className={`popup popup_type_open ${isOpen ? `popup_opened`: ""}`} >
            <div className="infotooltip">
                <button type="button" className="popup__close" onClick={onClose}/>
                <img className="infotooltip__icon" src={status ? successIcon : failIcon} />
                <p className="infotooltip__text">
                {status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                </p>
            </div>
        </div>
    )
}
    
export default InfoTooltip;