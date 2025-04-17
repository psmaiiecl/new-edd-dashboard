import { useContext } from "react";
import "./index.css";
import { ModalContext } from "../../context/ModalContext";

export function Modal() {
  const { isOpen, modalContent, closeModal } = useContext(ModalContext);
  if (!isOpen) return null;

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={closeModal}>
          ✖
        </button>
        {modalContent}
      </div>
    </div>
  );
}
