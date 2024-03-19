import './App.css'
import './assets/background-video/background-video.jsx';
import BackgroundLoginVideo from './assets/background-video/background-video.jsx';
import ModalLogin from './modals/modal-login/modal-login.jsx';
import React, { useState, useEffect } from 'react';
import Footer from './components/footer/footer.jsx';
import MenuAside from './components/menuAside/menuAside.jsx';
import Header from './components/header/header.jsx';
import Modal from 'react-modal';
import UserDetailsModal from './modals/modal-userDetails/modalUserDetails';
import { useUserStore } from '../userStore.js';
import { Routes, Route } from 'react-router-dom';
import Tasks from './elements/tasks';
import Users from './elements/users';
import DeletedTasks from './elements/deletedTasks';
import DeletedUsers from './elements/deletedUsers';
import useTasksStore from '../taskStore.js';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const {fetchActiveUsers, fetchInactiveUsers, users } = useUserStore();
  const [setIsModalOpen] = useState(false);
  const [setSelectedUser] = useState(null);
  const { isUserDetailsModalOpen, selectedUserForDetails, closeUserDetailsModal } = useUserStore();
  const [ setIsUsersRouteVisible] = useState(false);
  const { fetchActiveTasks, activeTasks} = useTasksStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveUsers();
    fetchInactiveUsers();
    fetchActiveTasks()
  }, []);
  

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/tasks');
  };

  const updateUserInfo = (name, photo) => {
    setUserName(name);
    setUserPhoto(photo);
  };

  return (
    <div className='App'>
      {!isLoggedIn ? (
        <div>
          <BackgroundLoginVideo />
          <ModalLogin onLogin= {handleLogin} />
        </div>
      ) : (
        <>
          <header>
            <Header userName={userName} userPhoto={userPhoto} updateUserInfo={updateUserInfo} />
          </header>
          <aside>
          <MenuAside onToggleUsersRoute={() => setIsUsersRouteVisible(prev => !prev)} />
          </aside>
          <Routes>
          <Route path="/tasks" element={<Tasks tasks={activeTasks} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/deletedUsers" element={<DeletedUsers />} />
          <Route path="/deletedTasks" element={ <DeletedTasks />} />
          <Route path="/" element={<Tasks tasks={activeTasks} />} />
          </Routes>
          <Footer />
        </>
      )}
      <UserDetailsModal isOpen={isUserDetailsModalOpen} user={selectedUserForDetails} onClose={closeUserDetailsModal} />
    </div>
  );
}

export default App;