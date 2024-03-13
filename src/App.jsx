import './App.css'
import './assets/background-video/background-video.jsx';
import BackgroundLoginVideo from './assets/background-video/background-video.jsx';
import ModalLogin from './modal-login/modal-login.jsx';
import React, { useState, useEffect } from 'react';
import Footer from './footer/footer.jsx';'./footer/footer.jsx';
import MenuAside from './menuAside/menuAside.jsx';
import Column from './column/column.jsx';
import Header from './header/header.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [isUsersView, setIsUsersView] = useState(false);
  const [users, setUsers] = useState([]);


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
             <Column title="Developer" users={users.filter(user => user.role === 'developer')} />
             <Column title="Scrum Master" users={users.filter(user => user.role === 'ScrumMaster')} />
             <Column title="Product Owner" users={users.filter(user => user.role === 'Owner')} />
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
    </div>
  );
}


export default App;