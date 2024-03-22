import React from 'react';
import './viewUsersButton.css';
import { useNavigate } from 'react-router-dom';

function ViewUsersButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/users');
  };

  return (
    <button className="view-users-button" onClick={handleClick}>
      View Users
    </button>
  );
}

export default ViewUsersButton;