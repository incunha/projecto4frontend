import React from 'react';
import './logoutButton.css';
import useAuthStore from '../../../../authStore'; 

function LogoutButton() {
    const setToken = useAuthStore(state => state.setToken); 

    const handleLogout = async () => {
        const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/logout', {
            method: 'GET',
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
              },
        });

        if (response.ok) {
            setToken(null);
            sessionStorage.removeItem('token'); 
            window.location.reload();
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