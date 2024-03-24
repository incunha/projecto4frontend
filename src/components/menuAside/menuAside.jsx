import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './menuAside.css';
import MyTasksButton from '../../elements/buttons/button-myTasks/myTasksButton';
import EditProfileButton from '../../elements/buttons/button-editProfile/editProfileButton';
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
import ViewDeletedUsersButton from '../../elements/buttons/button-viewDeletedUsers/viewDeletedUsersButton';
import CategorySelect from '../../elements/categorySelect/categorySelect';
import UserSelect from '../../elements/userSelect/userSelect';
import {useNavigate } from 'react-router-dom';

function MenuAside() {
  // Estado para controlar a abertura e fechamento do menu
  const [isOpen, setIsOpen] = useState(false);
  // Estado para controlar a abertura e fechamento do modal de adição do user
  const [isAddUserModelOpen, setIsAddUserModelOpen] = useState(false);
  // Estado para controlar a abertura e fechamento do modal de adição de tarefa
  const [isAddTaskModelOpen, setIsAddTaskModelOpen] = useState(false);
  // Estado para controlar a abertura e fechamento do modal de categorias
  const [isCategoriesModelOpen, setIsCategoriesModelOpen] = useState(false);
  // Estado para controlar a visibilidade da lista de users
  const isUsersVisible = useUserStore(state => state.isUsersVisible);
  // Função para alterar a visibilidade da lista de users
  const setIsUsersVisible = useUserStore(state => state.setIsUsersVisible);
  // Estado para controlar a exibição das tarefas excluídas
  const [viewDeletedTasks, setViewDeletedTasks] = useState(false);
  // Estado para controlar a exibição dos users excluídos
  const [viewDeletedUsers, setViewDeletedUsers] = useState(false);
  // Hook para obter a localização atual da rota
  const location = useLocation();
  // Dados do user logado
  const loggedUser = useUserStore(state => state.loggedUser);
  // Estado para controlar o menu ativo
  const [activeMenu, setActiveMenu] = useState(null);
  // Hook de navegação para redirecionamento de rotas
  const navigate = useNavigate();

  // Função para lidar com a exibição dos botões de visualização de tarefas
  const handleViewTasksButtons = () => {
    setActiveMenu('tasks');
  };

  // Função para lidar com a exibição dos botões de visualização de users
  const handleViewUsersButtons = () => {
    setActiveMenu('users');
  };

  // Função para alternar a visibilidade do menu
  const handleToggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    setIsAddUserModelOpen(false);
  };

  // Função para abrir ou fechar o modal de adição de um user
  const handleAddUser = () => {
    setIsAddUserModelOpen(!isAddUserModelOpen);
  };

  // Função para abrir ou fechar o modal de adição de tarefa
  const handleAddTask = () => {
    setIsAddTaskModelOpen(!isAddTaskModelOpen);
  };

  // Função para fechar o modal de adição de um user
  const handleModalClose = () => {
    setIsAddUserModelOpen(false);
  };

  // Função para abrir ou fechar o modal de categorias
  const handleCategories = () => {
    setIsCategoriesModelOpen(!isCategoriesModelOpen);
  };

  // Função para alternar a visibilidade da lista de users
  const handleViewUsers = () => {
    setIsUsersVisible();
  };

  // Função para alternar a exibição das tarefas excluídas
  const handleViewDeletedTasks = () => {
    setViewDeletedTasks(!viewDeletedTasks);
  };

  // Função para alternar a exibição dos users excluídos
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
          <EditProfileButton />
          <hr style={{borderTop: '1px solid white'}} />
          <ViewTasksButton /> 
          {location.pathname === '/tasks' && (loggedUser.role === 'ScrumMaster' || loggedUser.role === 'Owner') && <CategorySelect />}
          {location.pathname === '/tasks' && (loggedUser.role === 'ScrumMaster' || loggedUser.role === 'Owner') && <UserSelect />}
          {loggedUser.role ==='ScrumMaster' || loggedUser.role === 'Owner' ? <ViewDeletedTasksButton onClick={handleViewDeletedTasks}/> : null}
          <AddTaskButton onClick={handleAddTask} />
          <AddTaskModal isOpen={isAddTaskModelOpen} onRequestClose={handleAddTask} />
          <MyTasksButton />
          {loggedUser.role === 'Owner' ? <CategoriesButton onClick={handleCategories} /> : null}
          <CategoriesModal isOpen={isCategoriesModelOpen} onRequestClose={() => setIsCategoriesModelOpen(false)} />
          <hr style={{borderTop: '1px solid white'}} />
          {loggedUser.role === 'ScrumMaster' || loggedUser.role === 'Owner' ? <ViewUsersButton onClick={handleViewUsers} /> : null}
          {loggedUser.role=== 'Owner' ? <AddUserButton onClick={handleAddUser} /> : null}
          {loggedUser.role === 'Owner' ? <ViewDeletedUsersButton onClick={handleViewDeletedUsers} /> : null}
          <ModalAddUser isOpen={isAddUserModelOpen} onRequestClose={handleModalClose} />
          {isUsersVisible && <Users />}
          {viewDeletedTasks && <DeletedTasks />}
          
        </div>
      )}
    </div>
  );
}

export default MenuAside;