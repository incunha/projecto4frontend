import React, { useState } from 'react';
import './modalTask.css';

function TaskModal({ task, isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await updateTask(editedTask);
    setIsEditing(false);
    onClose();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  const handleChange = (event) => {
    setEditedTask({ ...editedTask, [event.target.name]: event.target.value });
  };

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
            <label>Category</label>
            <input type="text" name="category" value={editedTask.category} onChange={handleChange} />
            <label>Start Date</label>
            <input type="date" name="startDate" value={editedTask.startDate} onChange={handleChange} />
            <label>End Date</label>
            <input type="date" name="endDate" value={editedTask.endDate} onChange={handleChange} />
            <label>Priority</label>
            <input type="text" name="priority" value={editedTask.priority} onChange={handleChange} />
            <label>Status</label>
            <input type="text" name="status" value={editedTask.status} onChange={handleChange} />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Category: {task.category}</p>
            <p>Start Date: {task.startDate}</p>
            <p>End Date: {task.endDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={onClose}>Close</button>
            </>
        )}
      </div>
    </>
  )
);
}

export default TaskModal;