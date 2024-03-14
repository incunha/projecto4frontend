import React from 'react';
import './viewUsersButton.css';
import { useUsersStore } from '../../../../userStore';

function ViewUsersButton() {
  const { isUsersView, toggleUsersView } = useUsersStore();

  return (
    <button 
      className={`view-users-button ${isUsersView ? 'selected' : ''}`} 
      onClick={toggleUsersView}
    >
      View Users
    </button>
  );
}

export default ViewUsersButton;