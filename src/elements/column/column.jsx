import React, { useEffect } from 'react';
import './column.css';
import UserCard from '../userCard/userCard';
import TaskCard from '../taskCard/taskCard';
import { useUsersStore, useUserStore } from '../../../userStore'; 
import useTasksStore from '../../../taskStore'; 

function Column({ title }) {
  const { users, isUsersView } = useUsersStore();
  const { selectUser } = useUserStore();
  const { tasks, fetchTasks } = useTasksStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredUsers = users.filter(user => {
    if (title === 'Developer') return user.role === 'developer';
    if (title === 'Scrum Master') return user.role === 'ScrumMaster';
    if (title === 'Product Owner') return user.role === 'Owner';
    return false;
  });

  const filteredTasks = tasks.filter(task => {
    if (title === 'To Do') return task.status === 10;
    if (title === 'Doing') return task.status === 20;
    if (title === 'Done') return task.status === 30;
    return false;
  });

  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {isUsersView ? (
          filteredUsers.map(user => (
            <UserCard
              key={user.username}
              user={user}
              onUserClick={() => selectUser(user)} 
            />
          ))
        ) : (
          filteredTasks.map(task => (
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