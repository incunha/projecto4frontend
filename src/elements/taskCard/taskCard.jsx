import React from "react";
import "./taskCard.css";

function TaskCard({ task }) {
    return (
      <div className="task-card">
        <h3>{task.title}</h3>
        <p>{task.category}</p>
        <p>{task.description}</p>
      </div>
    );
  }

export default TaskCard;