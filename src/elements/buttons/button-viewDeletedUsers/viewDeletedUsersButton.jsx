import React from "react";
import "./viewDeletedUsersButton.css";
import { useNavigate } from "react-router-dom";

function ViewDeletedUsersButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/deletedUsers");
    };
    
    return (
        <button className="viewDeletedUsersButton" onClick={handleClick}>
        View Deleted Users
        </button>
    );
}

export default ViewDeletedUsersButton;