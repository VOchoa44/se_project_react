import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useEffect } from "react";

const LoginModal = ({ isOpen, onLogin, onClose }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const validationRules = {
    email: (value) => {
      if (!value) return "Email is required";
      return "";
    },
    password: (value) => {
      if (!value) return "Password is required";
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
    onLogin(values);
    resetForm(defaultValues, {}, false);
  }

  useEffect(() => {
    resetForm(defaultValues, {}, false);
  }, [isOpen]);

  return (
    <ModalWithForm
      title=""
      name=""
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      buttonText="Log In"
      isValid={isValid}
    >
      <label className="modal__label modal__label_input">
        Email*
        <input
          type="email"
          className={`modal__input ${
            values.email ? "modal__input_filled" : ""
          } ${hasSubmitted && errors.email ? "modal__input_error" : ""}`}
          name="email"
          id=""
          placeholder=""
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
          id=""
          placeholder=""
          value={values.password}
          onChange={handleChange}
        />
        {hasSubmitted && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
