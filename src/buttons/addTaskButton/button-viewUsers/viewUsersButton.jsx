import React from 'react';
import './viewUsersButton.css';

function ViewUsersButton({ isUsersView, setIsUsersView }) {
  return (
    <button 
      className={`view-users-button ${isUsersView ? 'selected' : ''}`} 
      onClick={() => setIsUsersView(prev => !prev)}
    >
      View Users
    </button>
  );
}

export default ViewUsersButton;