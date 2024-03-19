import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './menuAside.css';
import AddTaskButton from '../../elements/buttons/button-addtask/addTaskButton';
import AddUserButton from '../../elements/buttons/button-addUser/addUserButton';
import ModalAddUser from '../../modals/modal-addUser/modal-addUser';
import AddTaskModal from '../../modals/modal-addTask/modal-addTask';
import CategoriesButton from '../../elements/buttons/button-categories/categoriesButton';
import CategoriesModal from '../../modals/modal-categories/categoriesModal';
import ViewUsersButton from '../../elements/buttons/button-viewUsers/viewUsersButton';
import Users from '../../elements/users';
import ViewTasksButton from '../../elements/buttons/button-viewTaks/viewTasksButton';
import ViewDeletedTasksButton from '../../elements/buttons/button-viewDeletedTasks/viewDeletedTasksButton';
import { useUserStore } from '../../../userStore';
import DeletedTasks from '../../elements/deletedTasks';
import DeletedUsers from '../../elements/deletedUsers';
import ViewDeletedUsersButton from '../../elements/button-viewDeletedUsers/viewDeletedUsersButton';
import useCategoryStore from '../../../categoryStore';
import useTasksStore from '../../../taskStore';
import CategorySelect from '../../elements/categorySelect/categorySelect';

function MenuAside() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddUserModelOpen, setIsAddUserModelOpen] = useState(false);
  const [isAddTaskModelOpen, setIsAddTaskModelOpen] = useState(false);
  const [isCategoriesModelOpen, setIsCategoriesModelOpen] = useState(false);
  const isUsersVisible = useUserStore(state => state.isUsersVisible);
  const setIsUsersVisible = useUserStore(state => state.setIsUsersVisible);
  const [viewDeletedTasks, setViewDeletedTasks] = useState(false);
  const [viewDeletedUsers, setViewDeletedUsers] = useState(false);
  const location = useLocation();

  
 

  const handleToggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    setIsAddUserModelOpen(false);
  };

  const handleAddUser = () => {
    setIsAddUserModelOpen(!isAddUserModelOpen);
  };

  const handleAddTask = () => {
    setIsAddTaskModelOpen(!isAddTaskModelOpen);
  }
  

  const handleModalClose = () => {
    setIsAddUserModelOpen(false);
  };

  const handleCategories = () => {
    setIsCategoriesModelOpen(!isCategoriesModelOpen);
  };

  const handleViewUsers = () => {
    setIsUsersVisible();
  };

  const handleViewDeletedTasks = () => {
    setViewDeletedTasks(!viewDeletedTasks);
  };

  const handleViewDeletedUsers = () => {
    setViewDeletedUsers(!viewDeletedUsers);
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
          <AddTaskModal isOpen={isAddTaskModelOpen} onRequestClose={handleAddTask} />
          <ViewTasksButton />
          {location.pathname === '/tasks' && <CategorySelect />} {/* Add CategorySelect here */}
          <ViewDeletedTasksButton onClick={handleViewDeletedTasks}/>
          <AddUserButton onClick={handleAddUser} />
          <ViewUsersButton onClick={handleViewUsers} />
          <ViewDeletedUsersButton onClick={handleViewDeletedUsers} />
          <ModalAddUser isOpen={isAddUserModelOpen} onRequestClose={handleModalClose} />
          <CategoriesButton onClick={handleCategories} />
          <CategoriesModal isOpen={isCategoriesModelOpen} onRequestClose={() => setIsCategoriesModelOpen(false)} />
          {isUsersVisible && <Users />}
          {viewDeletedTasks && <DeletedTasks />}
        </div>
      )}
    </div>
  );
}

export default MenuAside;