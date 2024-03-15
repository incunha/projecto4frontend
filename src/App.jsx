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
import { useUsersStore, useUserStore } from '../userStore.js';
import { useRoutes, Routes, Route } from 'react-router-dom';
import Tasks from './elements/tasks';
import Users from './elements/users';

Modal.setAppElement('#root');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const { isUsersView, fetchUsers, users } = useUsersStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isUserDetailsModalOpen, selectedUserForDetails, closeUserDetailsModal } = useUserStore();
  const [isUsersRouteVisible, setIsUsersRouteVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
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
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/users" element={<Users users={users} onUserClick={handleOpenModal} />} />
          <Route path="/" element={<Tasks />} />
          </Routes>
          <Footer />
        </>
      )}
      <UserDetailsModal isOpen={isUserDetailsModalOpen} user={selectedUserForDetails} onClose={closeUserDetailsModal} />
    </div>
  );
}

export default App;