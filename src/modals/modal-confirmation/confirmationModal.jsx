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
        <div className="button-groupConfirmation">
        <button className='myButton' onClick={onRequestClose}>Close</button>
        <button className= 'myButton' onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;