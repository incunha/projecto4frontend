import React from 'react';
import './taskCard.css';

function TaskCard({ task }) {
  const { title, category, description, priority } = task;

  const getBackgroundColor = () => {
    switch(priority) {
      case 100: return 'lightgreen';
      case 200: return 'yellow';
      case 300: return 'red';
      default: return 'white';
    }
  };

  return (
    <div className="task-card" style={{ backgroundColor: getBackgroundColor() }}>
      <div className="task-title">{title}</div>
      <div className="task-details">
        <div className="task-category">{category}</div>
        <div className="task-description">{description}</div>
      </div>
    </div>
  );
}

export default TaskCard;