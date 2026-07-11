import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__delete-confirm-content">
        <button
          type="button"
          onClick={onClose}
          className="modal__delete-confirm-exit"
        ></button>
        <h2 className="modal__confirm-title">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </h2>
        <button
          className="modal__confirm-delete-button"
          type="button"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>
        <button
          className="modal__confirm-delete-cancel-button"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default DeleteConfirmModal;
