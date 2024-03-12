import React from 'react';
import './header.css'; 
import LogoutButton from '../buttons/addTaskButton/button-logout/logoutButton';
import UserName from '../username';
import { useState, useEffect } from 'react';

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
             <div>{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</div>
            <UserName userName={userName} userPhoto={userPhoto} updateUserInfo={updateUserInfo} />
            <LogoutButton/>
        </header>
    );
}

export default Header;