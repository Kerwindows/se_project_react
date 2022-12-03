import React from "react";
import PopupWithForm from "./PopupWithForm";

const PopupWithConfirmation = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.cardToDelete);
  }

  return (
    <PopupWithForm
      name='popup-confirmation'
      title={"Are you sure?"}
      submitText={props.isLoading ? "Deleting..." : "Are you sure"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
};

export default PopupWithConfirmation;
