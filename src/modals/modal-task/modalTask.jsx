import React, { useState, useEffect } from 'react';
import './modalTask.css';
import useTasksStore from '../../../taskStore';
import useCategoryStore from '../../../categoryStore';
import { useUserStore } from '../../../userStore';

function TaskModal({ task, isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const {categories, fetchCategories} = useCategoryStore();
  const loggedUser = useUserStore(state => state.loggedUser);

  const [taskCreator, setTaskCreator] = useState(null);

  useEffect(() => {
    const fetchTaskCreator = async () => {
      const taskCreator = await useTasksStore.getState().fetchTaskCreator(task.id);
        setTaskCreator(taskCreator);
};


  
    if (isOpen) {
      fetchTaskCreator();
    }
  }, [isOpen]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (editedTask.endDate === '') {
      editedTask.endDate = '2199-12-31';
    }
    await useTasksStore.getState().updateTask(editedTask);
    setIsEditing(false);
    onClose();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  function mapPriority(priority) {
    switch(priority) {
      case 100:
        return 'Low';
      case 200:
        return 'Medium';
      case 300:
        return 'High';
      default:
        return '';
    }
  }
  
  function mapStatus(status) {
    switch(status) {
      case 10:
        return 'To Do';
      case 20:
        return 'Doing';
      case 30:
        return 'Done';
      default:
        return '';
    }
  }

  return (
    isOpen && (
      <>
        <div className="modal-overlay" onClick={onClose} />
        <div className="modal">
          <h2>Task Details</h2>
          {isEditing ? (
            <>
              <label>Title</label>
              <input type="text" name="title" value={editedTask.title} onChange={handleChange} />
              <label>Description</label>
              <input type="text" name="description" value={editedTask.description} onChange={handleChange} />
              <select name="category" value={editedTask.category} onChange={handleChange}>
            {categories.map((category) => (
             <option key={category.name} value={category.name}>{category.name}</option>
         ))}
              </select>
              <label>Start Date</label>
              <input type="date" name="startDate" value={editedTask.startDate} onChange={handleChange} />
              <label>End Date</label>
              <input type="date" name="endDate" value={editedTask.endDate === '2199-12-31' ? '' : editedTask.endDate} onChange={handleChange} />
              <label>Priority</label>
              <select name="priority" value={editedTask.priority} onChange={handleChange}>
              <option value="100">Low</option>
              <option value="200">Medium</option>
              <option value="300">High</option>
              </select>
              <label>Status</label>
              <select name="status" value={editedTask.status} onChange={handleChange}>
              <option value="10">To Do</option>
              <option value="20">Doing</option>
             <option value="30">Done</option>
             </select>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Category: {task.category}</p>
              <p>Start Date: {task.startDate}</p>
              <p>End Date: {task.endDate === '2199-12-31' ? '' : task.endDate}</p>
              <p>Priority: {mapPriority(task.priority)}</p>
              <p>Status: {mapStatus(task.status)}</p>
              {taskCreator &&( loggedUser.role === 'Owner' || loggedUser.role === 'ScrumMaster' || (loggedUser.role === 'developer' && taskCreator.username === loggedUser.username)) ? <button onClick={handleEditClick}>Edit</button> : null}
              <button onClick={onClose}>Close</button>
            </>
          )}
        </div>
      </>
    )
  );
}

export default TaskModal;