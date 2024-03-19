import React, { useEffect, useState } from 'react';
import './taskCard.css';
import TaskModal from '../../modals/modal-task/modalTask';
import useTasksStore from '../../../taskStore';

function TaskCard({ task, active }) {

  
  const { title, user, priority } = task;
  const [userImage, setUserImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteTask = useTasksStore((state) => state.deleteTask);

  const handleDelete = async () => {
    await deleteTask(task.id);
  };

  const handleDoubleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRestore = async () => {
    const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/restore/${task.id}`, {
      method: 'PATCH',
      headers: {
        Accept: "*/*",
        token: sessionStorage.getItem("token"),
      },
    });
    if (response.ok) {  
      useTasksStore.getState().fetchTasks();
    } else {
      console.error('Failed to restore task');
    }
  };


  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/creator/${task.id}`, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token'),
        }
      });
      if (response.ok) {
        const userInfo = await response.json();
        fetchUserImage(userInfo.username);
      } else {
        console.error('Error fetching user info:', response.statusText);
      }
    };

  
    const fetchUserImage = async (username) => {
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/${username}`, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token'),
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUserImage(userData.userPhoto);
      } else {
        console.error('Error fetching user image:', response.statusText);
      }
    };
  
    fetchUserInfo();
  }, [task]);

  const getBorderColor = () => {
    switch(priority) {
      case 100: return 'lightgreen';
      case 200: return 'yellow';
      case 300: return 'red';
      default: return 'black';
    }
  };

  const getBackgroundColor = () => {
    switch(priority) {
      case 100: return 'rgba(144, 238, 144, 0.2)'; 
      case 200: return 'rgba(255, 255, 0, 0.2)'; 
      case 300: return 'rgba(255, 0, 0, 0.2)'; 
      default: return 'rgba(255, 255, 255, 0.2)'; 
    }
  };

  const cardStyle = {
    opacity: active ? 1 : 0.5, 
    backgroundColor: getBackgroundColor(), 
    border: `7px solid ${getBorderColor()}`,
  };
  
  return (
    <div className="task-card" style={cardStyle} draggable={active} onDragStart={(event)=>{
      if (!active) {
        event.preventDefault();
      } else {
        event.dataTransfer.setData('text/plain',task.id);
      }
    }} onDoubleClick={handleDoubleClick}>
      <div className="user-image">
        <img src={userImage} alt={user} />
      </div>
      <div className="task-title">{title}</div>
      {isModalOpen && <TaskModal task={task} isOpen={isModalOpen} onClose={handleCloseModal} />}
      <button className="deleteTaskButton" onClick={handleDelete}>X</button>
      {!active && <button className="restoreTaskButton" onClick={handleRestore}>
      <img src="multimedia/restore.png" alt="Restore Icon" /> </button>}
    </div>
  );
}
export default TaskCard;