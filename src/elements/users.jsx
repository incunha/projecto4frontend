import React, { useEffect } from 'react';
import Column from './column/column.jsx';
import { useUserStore } from '../../userStore.js';
import UserCard from './userCard/userCard.jsx';

function Users() {
  const userColumns = ['Developer', 'Scrum Master', 'Product Owner'];
  const roleMapping = {
    'Developer': 'developer',
    'Scrum Master': 'ScruMaster',
    'Product Owner': 'Owner'
  };

  const {users, fetchActiveUsers, selectUser: selectUserInStore} = useUserStore();

  useEffect(() => {
    fetchActiveUsers();
  }, [fetchActiveUsers]);

  const selectUser = (user) => {
    const token = sessionStorage.getItem('token');
    selectUserInStore(user.username, token);
  }

  return (
    <div className="columns">
      {userColumns.map(title => (
        <Column
          key={title}
          title={title}
          items={ActiveUsers.filter(user => user.role === roleMapping[title])}
          CardComponent={UserCard}
          onCardClick={selectUser}
        />
      ))}
    </div>
  );
}

export default Users;