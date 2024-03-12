import './App.css'
import './assets/background-video/background-video.jsx';
import BackgroundLoginVideo from './assets/background-video/background-video.jsx';
import ModalLogin from './modal-login/modal-login.jsx';
import React, { useState } from 'react';
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
            <MenuAside isUsersView={isUsersView} setIsUsersView={setIsUsersView} />
          </aside>
          {isUsersView ? (
            <div className="columns">
              <Column title="Developer" />
              <Column title="Scrum Master" />
              <Column title="Product Owner" />
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