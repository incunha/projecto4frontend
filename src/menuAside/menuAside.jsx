import React, { useState } from 'react';
import './menuAside.css';
import AddTaskButton from '../buttons/addTaskButton/addTaskButton';
import TaskModal from '../modal-addTask';

function MenuAside() {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleAddTask = () => {
        setIsModalOpen(true); 
    };

    const handleModalClose = () => {
        setIsModalOpen(false); 
    };

    return (
        <div className={`aside-menu ${isOpen ? 'open' : ''}`}>
            <button className="menu-button" onClick={handleToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="36px" height="36px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 11h16v2H4zm0-4h16v2H4zm0 8h16v2H4z"/>
                </svg>
            </button>
            {isOpen && (
                <div>
                    <AddTaskButton onClick={handleAddTask} />
                    <TaskModal isOpen={isModalOpen} onRequestClose={handleModalClose} /> {}
                </div>
            )}
        </div>
    );
}

export default MenuAside;