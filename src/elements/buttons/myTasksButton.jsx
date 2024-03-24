import React from 'react';
import  useTasksStore  from '../../../taskStore';
import { useUserStore } from '../../../userStore';
import { useNavigate } from 'react-router-dom';


function MyTasksButton() {
    const fetchTasksByUser = useTasksStore(state => state.fetchTasksByUser);
    const { loggedUser } = useUserStore();
    const navigate = useNavigate();
  
    const handleMyTasks = () => {
      if (loggedUser) {
        fetchTasksByUser(loggedUser.username);
        navigate('/userTasks');
      }
    };
  
    return (
      <button className = "aside-button" onClick={handleMyTasks}>My Tasks</button>
    );
  }
  
  export default MyTasksButton;