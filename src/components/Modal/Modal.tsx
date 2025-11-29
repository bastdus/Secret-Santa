import { ReactNode } from "react";
import "./Modal.css";

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ title, children, onClose }: ModalProps) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-title">{title}</h2>
      {children}
    </div>
  </div>
);

export default Modal;

