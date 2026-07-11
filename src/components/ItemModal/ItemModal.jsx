import "./ItemModal.css";
import deleteButtonImage from "../../assets/delete-item-btn.svg";
function ItemModal({ isOpen, onClose, handleDeleteClick, card }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__popup">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-popup"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              handleDeleteClick();
            }}
            className="modal__delete-button"
          >
            <img
              src={deleteButtonImage}
              alt="delete button"
              className="modal__delete-button-image"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
