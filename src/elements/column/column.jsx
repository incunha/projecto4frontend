import React from 'react';
import './column.css';
import UserCard from '../userCard/userCard';
import TaskCard from '../taskCard/taskCard';

function Column({ title, users, tasks, onUserClick, isUsersView }) {
  console.log(isUsersView);
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {isUsersView ? (
          users && users.map(user => (
            <UserCard
              key={user.username}
              username={user.username}
              name={user.name}
              photo={user.userPhoto}
              onUserClick={() => onUserClick(user)}
            />
          ))
        ) : (
          tasks && tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;