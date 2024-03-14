import './userCard.css';
import { useUserStore } from '../../../userStore';
import React, { useState } from 'react';

function UserCard({ username, name, photo }) {
  const { selectUser, openUserDetailsModal } = useUserStore();

  const handleClick = () => {
    const token = sessionStorage.getItem('token'); 
    selectUser(username, token);
  };

  const handleDoubleClick = async () => {
    await selectUser(username);
    openUserDetailsModal();
  };

  return (
    <div className="user-card" onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <img src={photo} alt={name} className="user-photo" />
      <span className="user-name">{name}</span>
    </div>
  );
}

export default UserCard;