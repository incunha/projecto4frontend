import React, { useEffect } from 'react';
import {useUserStore} from '../../../userStore';
import useTasksStore from '../../../taskStore';

function UserSelect() {
  const { users, fetchUsers } = useUserStore();
  const { fetchTasksByUser } = useTasksStore();
  const fetchTasks = useTasksStore(state => state.fetchTasks);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserChange = (event) => {
    event.target.value ==="" ? fetchTasks() : fetchTasksByUser(event.target.value);
  };


  return (
    <select onChange={handleUserChange}>
      <option value="">All Users</option>
      {users.map(user => (
        <option key={user.username} value={user.username}>
          {user.username}
        </option>
      ))}
    </select>
  );
}

export default UserSelect;