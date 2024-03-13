import React from 'react';
import './column.css';
import UserCard from '../userCard';

function Column({ title, users }) {
    return (
      <div className="column">
        <h2>{title}</h2>
        <div className="column-content">
          {users && users.map(user => (
            <UserCard key={user.username} name={user.name} photo={user.userPhoto} />
          ))}
        </div>
      </div>
    );
  }

export default Column;