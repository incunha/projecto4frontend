import React from 'react';
import { useNavigate } from 'react-router-dom';

function ViewUsersButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/users');
  };

  return (
    <button className="aside-button" onClick={handleClick}>
      View Users
    </button>
  );
}

export default ViewUsersButton;