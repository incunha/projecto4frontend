import './userCard.css';
import { useUserStore } from '../../../userStore';
import React, { useState } from 'react';

function UserCard({ user }) {
  const { selectUser, openUserDetailsModal } = useUserStore();

  const handleClick = () => {
    const token = sessionStorage.getItem('token'); 
    selectUser(user.username, token);
  };

  const handleDoubleClick = async () => {
    await selectUser(user.username);
    openUserDetailsModal();
  };

  return (
    <div className="user-card" onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <img src={user.userPhoto} alt={user.name} className="user-photo" />
      <span className="user-name">{user.name}</span>
    </div>
  );
}

export default UserCard;