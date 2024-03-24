import React from 'react';
import { useNavigate } from 'react-router-dom';

function ViewTasksButton() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/tasks');
    };
  
    return (
      <button className="aside-button" onClick={handleClick}>
        View Tasks
      </button>
    );
  }

export default ViewTasksButton;