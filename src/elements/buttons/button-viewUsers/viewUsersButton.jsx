import React from 'react';
import './viewUsersButton.css';
import { useUsersStore } from '../../../../userStore';
import { useNavigate } from 'react-router-dom';

function ViewUsersButton({ onClick }) {
  const { isUsersView, toggleUsersView } = useUsersStore();
  const navigate = useNavigate();

  const handleClick = () => {
    toggleUsersView();
    if (isUsersView) {
      navigate('/tasks');
    } else {
      navigate('/users');
    }
    onClick();
  };

  return (
    <button 
      className={`view-users-button ${isUsersView ? 'selected' : ''}`} 
      onClick={handleClick}
    >
      View Users
    </button>
  );
}

export default ViewUsersButton;