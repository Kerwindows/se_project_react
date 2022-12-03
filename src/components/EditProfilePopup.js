/* --------------------------------- imports -------------------------------- */
import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";

/* ------------------------ function EditProfilePopup ----------------------- */

function EditProfilePopup(props) {
  // Subscription to the context
  const currentUser = React.useContext(CurrentUserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    let defaultValues = {};
    defaultValues.name = currentUser.name;
    defaultValues.about = currentUser.about;
    reset({ ...defaultValues });
  }, [currentUser, props.isOpen]);

  function handleSubmitPost(validatedData) {
    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
      name: validatedData.name,
      description: validatedData.about,
    });
  }

  return (
    <PopupWithForm
      name='edit'
      title='Edit profile'
      submitText={props.isLoading ? "Saving..." : "Save"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit(handleSubmitPost)}
    >
      <input
        id='name-input'
        className='popup__form-input js-input-type-profile-name'
        type='text'
        placeholder='Name'
        {...register("name", {
          required: "A name is required",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
          maxLength: {
            value: 40,
            message: "Name cannot be more than 40 characters",
          },
        })}
      />
      <span className='popup__input-type-error name-input-error'>
        {errors.name && <p style={{ margin: 0 }}>{errors.name.message}</p>}
      </span>

      <input
        id='about-input'
        className='popup__form-input js-input-type-profile-about-me'
        type='text'
        placeholder='About Me'
        {...register("about", {
          required: "A description is required",
          minLength: {
            value: 2,
            message: "Description must be at least 2 characters",
          },
          maxLength: {
            value: 30,
            message: "Description cannot be more than 30 characters",
          },
        })}
      />
      <span className='popup__input-type-error about-input-error'>
        {errors.about && <p style={{ margin: 0 }}>{errors.about.message}</p>}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
