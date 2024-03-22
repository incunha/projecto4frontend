import './userCard.css';
import { useUserStore } from '../../../userStore';
import React, { useState } from 'react';

function UserCard({ user, active }) {
  if (!user) {
    return null;
  }

  const selectedUserInList = useUserStore(state => state.selectedUserInList);
  const openUserDetailsModal = useUserStore(state => state.openUserDetailsModal);
  
  const setActiveUser = useUserStore(state => state.setActiveUser);
  const handleDoubleClick = async () => {
    await selectedUserInList(user.username);
    setActiveUser(active);
    openUserDetailsModal();
  };

  const cardStyle = {
    opacity: active ? 1 : 0.5, 
  };

  return (
    <div className="user-card" style={cardStyle} onDoubleClick={handleDoubleClick}>
      <img src={user.userPhoto} alt={user.name} className="user-photo" />
      <span className="user-name">{user.name}</span>
    </div>
  );
}

export default UserCard;