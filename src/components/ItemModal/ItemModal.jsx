import "./ItemModal.css";
import deleteButtonImage from "../../assets/delete-item-btn.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ isOpen, onClose, handleDeleteClick, card }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
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
          {isOwn && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
