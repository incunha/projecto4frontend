import './App.css'
import './background-video/background-video.jsx';
import BackgroundLoginVideo from './background-video/background-video.jsx';
import ModalLogin from './modal-login/modal-login.jsx';
import React, { useState } from 'react';
import Footer from './footer/footer.jsx';'./footer/footer.jsx';
import MenuAside from './menuAside/menuAside.jsx';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <aside>
        <MenuAside />
        </aside>
      <Footer />
        </>
      )}
      </div>
  );
}

export default App
