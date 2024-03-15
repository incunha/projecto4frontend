import React from 'react';
import Column from './column/column.jsx';
import { useUsersStore } from '../../userStore.js';

function Users({ users, onUserClick }) {
    const { isUsersView } = useUsersStore();
    
    const userColumns = users ? {
      'Developer': users.filter(user => user.role === 'developer'),
      'Scrum Master': users.filter(user => user.role === 'ScrumMaster'),
      'Product Owner': users.filter(user => user.role === 'Owner')
    } : {};
  
    const taskColumns = ['To Do', 'Doing', 'Done'];
    
    return (
      <div className="columns">
        {isUsersView ? (
          Object.entries(userColumns).map(([title, users]) => (
            <Column key={title} title={title} users={users} onUserClick={onUserClick} />
          ))
        ) : (
          taskColumns.map(title => (
            <Column key={title} title={title} users={users} onUserClick={onUserClick} />
          ))
        )}
      </div>
    );
  }

export default Users;