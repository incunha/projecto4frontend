import React from 'react';
import './confirmationModal.css';

function ConfirmationModal({ isOpen, onRequestClose, message, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="warning-modal-overlay">
      <div className="warning-modal">
        <h2>Warning</h2>
        <p>{message}</p>
        <button onClick={onRequestClose}>Close</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;