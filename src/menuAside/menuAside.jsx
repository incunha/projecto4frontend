import React, { useState } from 'react';
import './menuAside.css';
import AddTaskButton from '../buttons/addTaskButton/addTaskButton';
import TaskModal from '../modal-addTask/modal-addTask';
import AddUserButton from '../buttons/addTaskButton/button-addUser/addUserButton';
import ModalAddUser from '../modal-addUser/modal-addUser';
import ViewUsersButton from '../buttons/addTaskButton/button-viewUsers/viewUsersButton';

function MenuAside({ isUsersView, setIsUsersView}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isAddUserModelOpen, setIsAddUserModelOpen] = useState(false); 
   

    const handleToggle = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
        setIsAddUserModelOpen(false); // Close the user modal when the aside opens
    };

    const handleAddTask = () => {
        setIsTaskModalOpen(!isTaskModalOpen); 
    };

    const handleAddUser = () => {
        setIsAddUserModelOpen(!isAddUserModelOpen); 
    };
   

    const handleModalClose = () => {
        setIsTaskModalOpen(false); 
        setIsAddUserModelOpen(false); 
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
                    <ViewUsersButton isUsersView={isUsersView} setIsUsersView={setIsUsersView} />
                    <TaskModal isOpen={isTaskModalOpen} onRequestClose={handleModalClose} />
                    <ModalAddUser isOpen={isAddUserModelOpen} onRequestClose={handleModalClose} />
                </div>
            )}
        </div>
    );
}

export default MenuAside;