import './modalLogin.css';
import React, { useState } from 'react';

function ModalLogin() {
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegisterClick = () => {
        setIsRegistering(true);
    };
    const handleCancelClick = () => {
        setIsRegistering(false);
    };
    const handleImageUrlChange = (event) => {
        const imageUrl = event.target.value;
        document.getElementById('userImage').src = imageUrl;
    };
    
    return (
        <div className="center-container">
            <div className="loginpanel">
                {!isRegistering ? (
                    <>
                        <img src="multimedia/logo_scrum_01.png" alt="Logo" height="150" />
                        <div className="input-container">
                            <input type="text" id="login" placeholder="username" required />
                            <input type="password" id="password" placeholder="password" required />
                        </div>
                        <button id="loginButton" className="myButton">Login</button>
                        <p id="warningMessage"></p>
                        <p>Don't have an account? <button id="registerLink" className="registerLink" onClick={handleRegisterClick}>Register now!</button></p>
                    </>
                ) : (
                <form>
                    <h2>Register</h2>
                    <input type="text" id="registerFirstName" className="inputField" placeholder="First Name" required />
                    <input type="text" id="registerLastName" className="inputField" placeholder="Last Name" required />
                    <input type="email" id="registerEmail" className="inputField" placeholder="Email" required />
                    <input type="text" id="registerUsername" className="inputField" placeholder="Username" required />
                    <input type="text" id="registerContact" className="inputField" placeholder="Contact" required />
                    <input type="url" id="userPhotoUrl" className="inputField" placeholder="Insert your photo-url here"onChange={handleImageUrlChange}/>
                    <input type="password" id="registerPassword" className="inputField" placeholder="Password" required />
                    <input type="password" id="registerRewritePassword" className="inputField" placeholder="Re-write Password" required />
                    <img id="userImage" className="userImage" />
                    <div className="buttonContainer">
                    <button id="cancelButton" className="myButton" onClick={handleCancelClick}>Cancel</button>
                    <button id="registerButton" className="myButton">Register</button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
}

export default ModalLogin;

