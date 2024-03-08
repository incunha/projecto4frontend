import './modalLogin.css';

function ModalLogin() {
    return (
<div className="center-container">
        <div className="loginpanel">
          <img src="multimedia/logo_scrum_01.png" alt="Logo" height="150" />
          <div className="input-container">
          <input type="text" id="login" placeholder="username" required />
          <input type="password" id="password" placeholder="password" required />
            </div>
          <button id="loginButton" className="myButton">Login</button>
          <p id="warningMessage"></p>
          <p>Don't have an account? register now!</p>
          <button id="registerButton" className="myButton">Register</button>
        </div>
      </div>
    );
}


export default ModalLogin;