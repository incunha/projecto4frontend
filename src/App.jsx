import './App.css'
import './assets/background-video/background-video.jsx';
import BackgroundLoginVideo from './assets/background-video/background-video.jsx';
import ModalLogin from './modals/modal-login/modal-login.jsx';
import React, { useState, useEffect } from 'react';
import Footer from './components/footer/footer.jsx';
import MenuAside from './components/menuAside/menuAside.jsx';
import Column from './elements/column/column.jsx';
import Header from './components/header/header.jsx';
import Modal from 'react-modal';
import UserDetailsModal from './modals/modal-userDetails/modalUserDetails';
import { useUsersStore } from '../userStore.js';
import { useUserStore } from '../userStore.js';

Modal.setAppElement('#root');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const { isUsersView, fetchUsers, users } = useUsersStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isUserDetailsModalOpen, selectedUserForDetails, closeUserDetailsModal } = useUserStore();
  

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
        <>
          <div>
            <BackgroundLoginVideo />
            <ModalLogin onLogin= {handleLogin} />
          </div>
        </>
      ) : (
        <>
          <header>
            <Header userName={userName} userPhoto={userPhoto} updateUserInfo={updateUserInfo} />
          </header>
          <aside>
            <MenuAside />
          </aside>
          {isUsersView ? (
            <div className="columns">
             <Column title="Developer" users={users} onUserClick={handleOpenModal} />
            <Column title="Scrum Master" users={users} onUserClick={handleOpenModal} />
            <Column title="Product Owner" users={users} onUserClick={handleOpenModal} />
       </div>
          ) : (
            <div className="columns">
              <Column title="To Do" />
              <Column title="Doing" />
              <Column title="Done" />
            </div>
          )}
          <Footer />
        </>
      )}
       <UserDetailsModal isOpen={isUserDetailsModalOpen} user={selectedUserForDetails} onClose={closeUserDetailsModal} />
    </div>
  );
}

export default App;