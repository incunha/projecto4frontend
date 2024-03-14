import React from 'react';
import './addUserButton.css'

const AddUserButton = ({ onClick }) => {
    return (
        <button className="add-task-button" onClick={onClick}>
            Add User
        </button>
    );
};

export default AddUserButton;