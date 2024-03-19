import React from "react";
import "./viewDeletedTasksButton.css";
import { useNavigate } from "react-router-dom";

function ViewDeletedTasksButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/deletedTasks");
    };
    
    return (
        <button className="viewDeletedTasksButton" onClick={handleClick}>
        View Deleted Tasks
        </button>
    );
}

export default ViewDeletedTasksButton;