import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };

  const validationRules = {
    name: (value) => {
      if (!value) return "Name is required";
      if (value.length < 1) return "Name must be at least 1 character";
      if (value.length > 30) return "Name must be no more than 30 characters";
      return "";
    },
    imageUrl: (value) => {
      if (!value) return "Image URL is required";
      try {
        new URL(value);
        return "";
      } catch {
        return "Please enter a valid URL";
      }
    },
    weatherType: (value) => {
      if (!value) return "Please select a weather type";
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
    resetForm(defaultValues, {}, false);
  }

  useEffect(() => {
    resetForm(defaultValues, {}, false);
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
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
          id="clothing-name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {hasSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label className="modal__label modal__label_input">
        Image URL
        <input
          type="text"
          className={`modal__input ${
            values.imageUrl ? "modal__input_filled" : ""
          } ${hasSubmitted && errors.imageUrl ? "modal__input_error" : ""}`}
          name="imageUrl"
          id="clothing-link"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
        {hasSubmitted && errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__input-radio"
            name="weatherType"
            value="hot"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__input-radio"
            name="weatherType"
            value="warm"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__input-radio"
            name="weatherType"
            value="cold"
            onChange={handleChange}
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
        {hasSubmitted && errors.weatherType && (
          <span className="modal__error">{errors.weatherType}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
