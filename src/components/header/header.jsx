import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './header.css'; 
import LogoutButton from '../../elements/buttons/button-logout/logoutButton'
import UserName from '../../elements/username/username'

function Header({ userName, userPhoto, updateUserInfo }) {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentDateTime(new Date());
        }, 1000);
    
        return () => {
          clearInterval(timer);
        };
      }, []);

    return (
        <header className="header">
          <UserName userName={userName} userPhoto={userPhoto} updateUserInfo={updateUserInfo} />
          <div className = "dateHeader">{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</div>
          <LogoutButton/>
        </header>
    );
}

Header.propTypes = {
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
    updateUserInfo: PropTypes.func.isRequired
};

export default Header;