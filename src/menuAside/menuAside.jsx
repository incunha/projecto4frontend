import React, { useState } from 'react';
import './menuAside.css';

function MenuAside() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`aside-menu ${isOpen ? 'open' : ''}`}>
            <button className="menu-button" onClick={handleToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="36px" height="36px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 11h16v2H4zm0-4h16v2H4zm0 8h16v2H4z"/>
                </svg>
            </button>
            {isOpen && (
                <div>
                </div>
            )}
        </div>
    );
}

export default MenuAside;