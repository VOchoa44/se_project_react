import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useEffect, useContext } from "react";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const defaultValues = {
    name: "",
    avatar: "",
  };
  const validationRules = {
    name: (value) => {
      if (!value) return "Name is required";
      if (value.length < 1) return "Name must be at least 1 character";
      if (value.length > 30) return "Name must be no more than 30 characters";
      return "";
    },
    avatar: (value) => {
      if (!value) return "Avatar is required";
      return "";
    },
  };
  const {
    values,
    handleChange,
    resetForm,
    errors,
    handleSubmit,
    hasSubmitted,
    isValid,
  } = useFormWithValidation(defaultValues, validationRules);

  function handleFormSubmit(evt) {
    evt.preventDefault();

    if (!handleSubmit()) return;

    onUpdateUser(values);
  }

  useEffect(() => {
    if (isOpen) {
      resetForm(
        {
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        {},
        true,
      );
    }
  }, [isOpen, currentUser, resetForm]);

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isValid={isValid}
    >
      <label className="modal__label modal__label_input">
        Name
        <input
          type="text"
          className={`modal__input ${
            values.name ? "modal__input_filled" : ""
          } ${hasSubmitted && errors.name ? "modal__input_error" : ""}`}
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {hasSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label className="modal__label modal__label_input">
        Avatar
        <input
          type="url"
          className={`modal__input ${
            values.avatar ? "modal__input_filled" : ""
          } ${hasSubmitted && errors.avatar ? "modal__input_error" : ""}`}
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
        {hasSubmitted && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
