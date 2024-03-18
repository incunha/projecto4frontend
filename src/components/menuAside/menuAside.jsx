// MenuAside.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menuAside.css';
import AddTaskButton from '../../elements/buttons/button-addtask/addTaskButton';
import TaskModal from '../../modals/modal-addTask/modal-addTask';
import AddUserButton from '../../elements/buttons/button-addUser/addUserButton';
import ModalAddUser from '../../modals/modal-addUser/modal-addUser';
import CategoriesButton from '../../elements/buttons/button-categories/categoriesButton';
import CategoriesModal from '../../modals/modal-categories/categoriesModal';
import ViewUsersButton from '../../elements/buttons/button-viewUsers/viewUsersButton';
import Users from '../../elements/users';
import ViewTasksButton from '../../elements/buttons/button-viewTaks/viewTasksButton';
import { useUserStore } from '../../../userStore';

function MenuAside() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAddUserModelOpen, setIsAddUserModelOpen] = useState(false);
  const [isCategoriesModelOpen, setIsCategoriesModelOpen] = useState(false);
  const isUsersVisible = useUserStore(state => state.isUsersVisible);
  const setIsUsersVisible = useUserStore(state => state.setIsUsersVisible);
 

  const handleToggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    setIsAddUserModelOpen(false);
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

  const handleCategories = () => {
    setIsCategoriesModelOpen(!isCategoriesModelOpen);
  };

  const handleViewUsers = () => {
    setIsUsersVisible();
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
          <ViewTasksButton />
          <AddUserButton onClick={handleAddUser} />
          <ViewUsersButton onClick={handleViewUsers} />
          

          <TaskModal isOpen={isTaskModalOpen} onRequestClose={handleModalClose} />
          <ModalAddUser isOpen={isAddUserModelOpen} onRequestClose={handleModalClose} />
          <CategoriesButton onClick={handleCategories} />
          <CategoriesModal isOpen={isCategoriesModelOpen} onRequestClose={() => setIsCategoriesModelOpen(false)} />
          {isUsersVisible && <Users />}
        </div>
      )}
    </div>
  );
}

export default MenuAside;