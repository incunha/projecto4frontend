import React from 'react';
import './header.css'; 
import LogoutButton from '../buttons/addTaskButton/button-logout/logoutButton';

function Header() {
    return (
        <header className="header">
            <LogoutButton/>
        </header>
    );
}

export default Header;