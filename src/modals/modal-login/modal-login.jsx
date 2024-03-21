import './modal-login.css';
import React, { useState, useEffect } from 'react';
import useAuthStore from '../../../authStore';


function ModalLogin(props) {
    const setToken = useAuthStore(state => state.setToken);
    const [isRegistering, setIsRegistering] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [userPhoto, setUserPhoto] = useState('./multimedia/profile.png.png');
    const [password, setPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [imageUrlInput, setImageUrlInput] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setToken(token);
            props.onLogin();
        }
    }, [setToken, props]);

    const handleRegisterClick = () => {
        setIsRegistering(true);
    };
    const handleCancelClick = () => {
        setIsRegistering(false);
    };
    const handleImageUrlChange = (event) => {
        const imageUrl = event.target.value;
        setImageUrlInput(imageUrl);
        document.getElementById('userImage').src = imageUrl;
        setUserPhoto(imageUrl);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const user = {
            name: firstName + " " + lastName,
            email: email,
            username: username,
            contactNumber: contactNumber,
            userPhoto: userPhoto,
            password: password,
        };

        const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/register', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            setIsRegistering(false);
        } else {
            alert('Error registering user');
        }
    };
    
    const handleLoginClick = async () => {
        const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/login', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'username': loginUsername,
                'password': loginPassword,
            },
        });
    
        if (response.ok) {
            const token = await response.text();
            console.log(token);
            setToken(token);
            sessionStorage.setItem('token', token);
            props.onLogin();
        } else {
            alert('Error logging in');
        }
    };
    
    return (
        <div className="center-container">
            <div className="loginpanel">
                {!isRegistering ? (
                    <>
                        <img src="multimedia/logo_scrum_01.png" alt="Logo" height="150" />
                        <div className="input-container">
                            <input type="text" id="login" placeholder="username" required value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
                            <input type="password" id="password" placeholder="password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                        </div>
                        <button id="loginButton" className="myButton" onClick={handleLoginClick}>Login</button>
                        <p id="warningMessage"></p>
                        <p>Don't have an account? <button id="registerLink" className="registerLink" onClick={handleRegisterClick}>Register now!</button></p>
                    </>
                ) : (
                <form onSubmit={handleRegister}>
                    <h2>Register</h2>
                    <input className ="inputLogin" type="text" id="registerFirstName"  placeholder="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input className ="inputLogin" type="text" id="registerLastName"  placeholder="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                    <input className ="inputLogin" type="email" id="registerEmail"  placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input className ="inputLogin" type="text" id="registerUsername"  placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
                    <input className ="inputLogin" type="text" id="registerContact"  placeholder="Contact" required value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
                    <input className ="inputLogin" type="url" id="userPhotoUrl"  placeholder="Image URL" required value={imageUrlInput} onChange={e => handleImageUrlChange(e)} />
                    <input className ="inputLogin" type="password" id="registerPassword"  placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <img className="userImageLogin" src={userPhoto} />
                    <div className="buttonContainerLogin">
                    <button className="myButton" onClick={handleCancelClick}>Cancel</button>
                    <button className="myButton">Register</button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
}

export default ModalLogin;

