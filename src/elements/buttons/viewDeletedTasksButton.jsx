import React from "react";
import { useNavigate } from "react-router-dom";

function ViewDeletedTasksButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/deletedTasks");
    };
    
    return (
        <button className="aside-button" onClick={handleClick}>
        View Deleted Tasks
        </button>
    );
}

export default ViewDeletedTasksButton;