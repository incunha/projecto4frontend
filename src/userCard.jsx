import React from 'react';
import './userCard.css';

function UserCard({ name, photo }) {
  return (
    <div className="user-card">
      <img src={photo} alt={name} className="user-photo" />
      <span className="user-name">{name}</span>
    </div>
  );
}

export default UserCard;