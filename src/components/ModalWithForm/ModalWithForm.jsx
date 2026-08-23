import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText = "Add garment",
  secondaryButtonText,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  onSecondaryClick,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons">
            <button
              type="submit"
              className={`modal__submit ${isValid ? "modal__submit_active" : ""}`}
            >
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                onClick={onSecondaryClick}
                className="modal__secondary-button"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
