import React from 'react';
import './header.css'; 
import LogoutButton from '../buttons/addTaskButton/button-logout/logoutButton';
import UserName from '../username';

function Header() {
    return (
        <header className="header">
            <UserName/>
            <LogoutButton/>
        </header>
    );
}

export default Header;