import React from 'react';
import './viewTasksButton.css';
import { useNavigate } from 'react-router-dom';

function ViewTasksButton() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/tasks');
    };
  
    return (
      <button className="viewTasksButton" onClick={handleClick}>
        View Tasks
      </button>
    );
  }

export default ViewTasksButton;