import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useEffect } from "react";

const RegisterModal = ({ isOpen, onRegister, onClose, onLoginClick }) => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };

  const validationRules = {
    name: (value) => {
      if (!value) return "Name is required";
      if (value.length < 1) return "Name must be at least 1 character";
      if (value.length > 30) return "Name must be no more than 30 characters";
      return "";
    },
    email: (value) => {
      if (!value) return "Email is required";
      return "";
    },
    password: (value) => {
      if (!value) return "Password is required";
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

    onRegister(values);
  }

  useEffect(() => {
    resetForm(defaultValues, {}, false);
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      name=""
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      buttonText="Sign Up"
      secondaryButtonText="or Log In"
      onSecondaryClick={onLoginClick}
    >
      <label className="modal__label modal__label_input">
        Name*
        <input
          type="text"
          className={`modal__input ${
            values.name ? "modal__input_filled" : ""
          } ${hasSubmitted && errors.name ? "modal__input_error" : ""}`}
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          isValid={isValid}
        />
        {hasSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label className="modal__label modal__label_input">
        Email*
        <input
          type="email"
          className={`modal__input ${
            values.email ? "modal__input_filled" : ""
          } ${hasSubmitted && errors.email ? "modal__input_error" : ""}`}
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {hasSubmitted && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>
      <label className="modal__label modal__label_input">
        Password*
        <input
          type="password"
          className={`modal__input ${
            values.password ? "modal__input_filled" : ""
          } ${hasSubmitted && errors.password ? "modal__input_error" : ""}`}
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {hasSubmitted && errors.password && (
          <span className="modal__error">{errors.password}</span>
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

export default RegisterModal;
