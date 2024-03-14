import React from 'react';
import './column.css';
import UserCard from '../userCard/userCard';
import { useUsersStore, useUserStore } from '../../../userStore'; 

function Column({ title }) {
  const { users, isUsersView } = useUsersStore();
  const { selectUser } = useUserStore();

  const filteredUsers = users.filter(user => {
    if (title === 'Developer') return user.role === 'developer';
    if (title === 'Scrum Master') return user.role === 'ScrumMaster';
    if (title === 'Product Owner') return user.role === 'Owner';
    return false;
  });

  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {isUsersView && filteredUsers.map(user => (
          <UserCard
            key={user.username}
            username={user.username}
            name={user.name}
            photo={user.userPhoto}
            onUserClick={() => selectUser(user)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Column;