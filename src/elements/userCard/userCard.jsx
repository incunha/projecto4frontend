import './userCard.css';
import { useUserStore } from '../../../userStore';
import React, { useState } from 'react';

function UserCard({ username, name, photo }) {
  const { selectUser } = useUserStore();

  const handleClick = () => {
    const token = sessionStorage.getItem('token'); 
    selectUser(username, token);
  };

  return (
    <div className="user-card" onClick={handleClick}>
      <img src={photo} alt={name} className="user-photo" />
      <span className="user-name">{name}</span>
    </div>
  );
}

export default UserCard;