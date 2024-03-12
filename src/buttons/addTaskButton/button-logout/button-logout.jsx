import React from 'react';
import './LogoutButton.css';

function LogoutButton() {
    const handleLogout = async () => {
        const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/logout', {
            method: 'POST',
        });

        if (response.ok) {
            window.location.href = '/login';
        } else {
            alert('Logout failed');
        }
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;