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

Modal.setAppElement('#root');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [isUsersView, setIsUsersView] = useState(false);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
  useEffect(() => {
    async function fetchUsers() {
      const token = sessionStorage.getItem('token'); 

      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/all', {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          token: token,
        }
      });

      if (response.status === 200) {
        const usersArray = await response.json();
        console.log(usersArray);
        if (usersArray.length === 0) {
          console.log("Users not found");
        } else {
          setUsers(usersArray);
        }
      } else if (response.status === 403) {
        console.log("Unauthorized access");
      }
    }

    fetchUsers();
  }, []);

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
            <MenuAside isUsersView={isUsersView} setIsUsersView={setIsUsersView} />
          </aside>
          {isUsersView ? (
            <div className="columns">
                 <Column title="Developer" users={users.filter(user => user.role === 'developer')} onUserClick={handleOpenModal} />
                 <Column title="Scrum Master" users={users.filter(user => user.role === 'ScrumMaster')} onUserClick={handleOpenModal} />
                 <Column title="Product Owner" users={users.filter(user => user.role === 'Owner')} onUserClick={handleOpenModal} />
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
       <UserDetailsModal isOpen={isModalOpen} user={selectedUser} onClose={handleCloseModal} />
    </div>
  );
}


export default App;