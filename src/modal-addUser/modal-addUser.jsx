import './modal-addUser.css';
import React, { useState } from 'react';

function ModalAddUser(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [userPhoto, setUserPhoto] = useState('./multimedia/profile.png.png');
    const [password, setPassword] = useState('');
    const [imageUrlInput, setImageUrlInput] = useState('');

    const handleImageUrlChange = (event) => {
        const imageUrl = event.target.value;
        setImageUrlInput(imageUrl);
        document.getElementById('userImage').src = imageUrl;
        setUserPhoto(imageUrl);
    };

    const handleCancelClick = () => {
        props.onRequestClose();
    };

    return (
        <div className="modalAddUser">
            <h2>Register</h2>
            <form>
                <input type="text" id="registerFirstName" className="inputField" placeholder="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input type="text" id="registerLastName" className="inputField" placeholder="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                <input type="email" id="registerEmail" className="inputField" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="text" id="registerUsername" className="inputField" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
                <input type="text" id="registerContact" className="inputField" placeholder="Contact" required value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
                <input type="url" id="userPhotoUrl" className="inputField" placeholder="Image URL" required value={imageUrlInput} onChange={e => handleImageUrlChange(e)} />
                <input type="password" id="registerPassword" className="inputField" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                <img id="userImage" className="userImage" src={userPhoto} />
                <div className="buttonContainer">
                    <button id="cancelButton" className="myButton" onClick={handleCancelClick}>Cancel</button>
                    <button id="registerButton" className="myButton">Register</button>
                </div>
            </form>
        </div>
    );
}

export default ModalAddUser;