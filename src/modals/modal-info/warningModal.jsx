import React from 'react';
import './warningModal.css';


function WarningModal({  message, onClose }) { 

  return (
    
    <div className="warning-modal-overlay">
      <div className="warning-modal">
        <h2>Warning</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default WarningModal;