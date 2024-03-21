import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './userModal.css';

function UserModal({ isOpen, onRequestClose, updateUserInfo }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/myUserDto', {
        method: 'GET',
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setFirstName(data.name ? data.name.split(' ')[0] : '');
        setLastName(data.name ? data.name.split(' ')[1] : '');
        setEmail(data.email);
        setUsername(data.username);
        setContactNumber(data.contactNumber);
        setUserPhoto(data.userPhoto);
      } else {
        console.error('Failed to fetch user data');
      }
    };

    if (isOpen) {
      fetchUser();
    }
  }, [isOpen]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    onRequestClose();
  };

  const handleSaveClick = async () => {
    const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/update', {
      method: 'PUT',
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: firstName + ' ' + lastName,
        email,
        username,
        contactNumber,
        userPhoto
      })
    });
    if (response.ok) {
      alert('User data updated successfully');
      setIsEditing(false);
      onRequestClose();
      updateUserInfo(firstName, userPhoto);
    } else {
      console.error('Failed to update user data');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} className="modalAddUser">
      <div className="modalContent">
        <span id="closeButtonProfile" onClick={handleClose}>X</span>
        <div className="inputFields">
          <label className = "labelProfile" >First Name</label>
          <input type="text" className="inputFieldProfile" placeholder={firstName} disabled={!isEditing} onChange={e => setFirstName(e.target.value)} />
          <label className = "labelProfile" >Last Name</label>
          <input type="text" className="inputFieldProfile" placeholder={lastName} disabled={!isEditing} onChange={e => setLastName(e.target.value)} />
          <label className = "labelProfile" >Email</label>
          <input type="email" className="inputFieldProfile" placeholder={email} disabled={!isEditing} onChange={e => setEmail(e.target.value)} />
          <label className = "labelProfile" >Username</label>
          <input type="text" className="inputFieldProfile" placeholder={username} disabled={!isEditing} onChange={e => setUsername(e.target.value)} />
          <label className = "labelProfile" >Contact Number</label>
          <input type="text" className="inputFieldProfile" placeholder={contactNumber} disabled={!isEditing} onChange={e => setContactNumber(e.target.value)} />
          <label className = "labelProfile" >User Photo URL</label>
          <input type="url" className="inputFieldProfile" placeholder={userPhoto} disabled={!isEditing} onChange={e => setUserPhoto(e.target.value)} />
          <label className = "labelProfile" >Password</label>
          <input type="password" className="inputFieldProfile" placeholder="Password" disabled={!isEditing} />
          <label className = "labelProfile" >Re-write Password</label>
          <input type="password" className="inputFieldProfile" placeholder="Re-write Password" disabled={!isEditing} />
        </div>
        <div className="userImageContainer">
          <img id="userImage" className="userImageProfile" src={user.userPhoto} />
        </div>
      </div>
      <div className="buttonContainer">
        <button id="editButton" className="myButton" onClick={handleEditClick}>Edit</button>
        {isEditing && <button id="saveButton" className="myButton" onClick={handleSaveClick}>Save</button>}
      </div>
    </Modal>
  );
}

export default UserModal;