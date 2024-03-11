import './App.css'
import './assets/background-video/background-video.jsx';
import BackgroundLoginVideo from './assets/background-video/background-video.jsx';
import ModalLogin from './modal-login/modal-login.jsx';
import React, { useState } from 'react';
import Footer from './footer/footer.jsx';'./footer/footer.jsx';
import MenuAside from './menuAside/menuAside.jsx';
import Column from './column/column.jsx';
import Header from './header/header.jsx';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
          <Header/>
        </header>
       <aside>
            <MenuAside />
          </aside>
          <div className="columns">
            <Column title="To Do" />
            <Column title="Doing" />
            <Column title="Done" />
          </div>
            <Footer />
        </>
      )}
      </div>
  );
}

export default App
