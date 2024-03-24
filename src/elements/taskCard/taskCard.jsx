import React, { useEffect, useState } from 'react';
import './taskCard.css';
import TaskModal from '../../modals/modal-task/modalTask';
import useTasksStore from '../../../taskStore';
import { useUserStore } from '../../../userStore';
import ConfirmationModal from '../../modals/modal-confirmation/confirmationModal';

function TaskCard({ task, active }) {
  const { title, priority } = task;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const loggedUser = useUserStore((state) => state.loggedUser);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
  const [isRestoreConfirmationModalOpen, setIsRestoreConfirmationModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteTask(task.id, active);
    setIsDeleteConfirmationModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalOpen(false);
  };


  const handleDoubleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRestore = async () => {
    setIsRestoreConfirmationModalOpen(true);
  };

  const handleConfirmRestore = async () => {
    const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/restore/${task.id}`, {
      method: 'PATCH',
      headers: {
        Accept: "*/*",
        token: sessionStorage.getItem("token"),
      },
    });
    if (response.ok) {  
      useTasksStore.getState().fetchActiveTasks();
      useTasksStore.getState().fetchInactiveTasks();
    } else {
      console.error('Failed to restore task');
    }
    setIsRestoreConfirmationModalOpen(false);
  };

  const handleCancelRestore = () => {
    setIsRestoreConfirmationModalOpen(false);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/creator/${task.id}`, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token'),
        }
      });
      if (!response.ok) {
        console.error('Error fetching user info:', response.statusText);
      }
    };
  
    fetchUserInfo();
  }, [task]);

  const getBorderColor = () => {
    switch(priority) {
      case 100: return active ? 'rgba(144, 238, 144, 1)' : 'rgba(144, 238, 144, 0.5)';
      case 200: return active ? 'rgba(255, 255, 0, 1)' : 'rgba(255, 255, 0, 0.5)';
      case 300: return active ? 'rgba(255, 0, 0, 1)' : 'rgba(255, 0, 0, 0.5)';
      default: return active ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.5)';
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
    backgroundColor: getBackgroundColor(), 
    border: `7px solid ${getBorderColor()}`,
  };
  
  return (
    <div 
      className= {`task-card ${active ? 'active' : 'inactive'}`} 
      style={cardStyle} draggable={active}  onDragStart={(event)=>{
        if (!active) {
          event.preventDefault();
        } else {
          event.dataTransfer.setData('text/plain',task.id);
        }
      }} onDoubleClick={handleDoubleClick}
    >
      <div className="task-title">{title}</div>
      {isModalOpen && <TaskModal task={task} isOpen={isModalOpen} onClose={handleCloseModal} />}
      {isDeleteConfirmationModalOpen && <ConfirmationModal isOpen={isDeleteConfirmationModalOpen} onRequestClose={handleCancelDelete} message="Are you sure you want to delete this task?" onConfirm={handleConfirmDelete} />}
      {isRestoreConfirmationModalOpen && <ConfirmationModal isOpen={isRestoreConfirmationModalOpen} onRequestClose={handleCancelRestore} message="Are you sure you want to restore this task?" onConfirm={handleConfirmRestore} />}
      {(loggedUser?.role && ((loggedUser.role === 'ScrumMaster' && active) || loggedUser.role === 'Owner')) && <button className="deleteTaskButton" onClick={handleDelete}>X</button>}
      {loggedUser?.role && loggedUser.role === 'Owner' && !active && <button className="restoreTaskButton" onClick={handleRestore}>
      <img src="multimedia/restore.png" alt="Restore Icon" /> </button>}
    </div>
  );
}
export default TaskCard;