import React, { useState } from 'react';
import './menuAside.css';
import AddTaskButton from '../buttons/addTaskButton/addTaskButton';
import TaskModal from '../modal-addTask';
import AddUserButton from '../buttons/addTaskButton/button-addUser/button-addUser';
import ModalAddUser from '../modal-addUser/modal-addUser';



function MenuAside() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); 

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleAddTask = () => {
        setIsTaskModalOpen(true); 
    };

    const handleAddUser = () => {
        setIsRegisterModalOpen(true); 
    };

    const handleModalClose = () => {
        setIsTaskModalOpen(false); 
        setIsRegisterModalOpen(false); 
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
                    <AddUserButton onClick={handleAddUser} />
                    <TaskModal isOpen={isTaskModalOpen} onRequestClose={handleModalClose} />
                    <ModalAddUser isOpen={isRegisterModalOpen} onRequestClose={handleModalClose} /> {}
                </div>
            )}
        </div>
    );
}

export default MenuAside;