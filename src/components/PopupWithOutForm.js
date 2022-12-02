/* --------------------------------- imports -------------------------------- */
import React from "react";
import closeIcon from "../images/close-icon.svg";

/* ------------------------- function PopupWIthOutForm ------------------------- */
function PopupWithOutForm(props) {
  return (
    <div id={props.name} className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className='popup__overlay'></div>
      <div className='popup__form-card'>
        <button
          onClick={props.onClose}
          aria-label='Close Form Button'
          type='button'
          className={`popup__close-btn popup__${props.name}-close-btn`}
        >
          <img className='popup__close-icon' src={closeIcon} alt='close' />
        </button>
        <div
          id={props.name}
          onSubmit={props.onSubmit}
          className={`popup__${props.name}-form popup__form`}
          name={`${props.name}Form`}
        >
          {" "}
          {props.children}
          <h2 className='popup__form-label' style={{ textAlign: "center" }}>
            {props.title}
          </h2>
        </div>
      </div>
    </div>
  );
}
export default PopupWithOutForm;
