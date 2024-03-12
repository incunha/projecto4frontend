import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './userModal.css';

function UserModal({ isOpen, onRequestClose }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modalAddUser">
      <div className="modalContent">
        <span id="closeButton" onClick={onRequestClose}>X</span>
        <div className="inputFields">
        <label>First Name</label>
<input type="text" className="inputField" placeholder={user.name ? user.name.split(' ')[0] : ''} disabled={!isEditing} />
<label>Last Name</label>
<input type="text" className="inputField" placeholder={user.name ? user.name.split(' ')[1] : ''} disabled={!isEditing} />
          <label>Email</label>
          <input type="email" className="inputField" placeholder={user.email} disabled={!isEditing} />
          <label>Username</label>
          <input type="text" className="inputField" placeholder={user.username} disabled={!isEditing} />
          <label>Contact Number</label>
          <input type="text" className="inputField" placeholder={user.contactNumber} disabled={!isEditing} />
          <label>User Photo URL</label>
          <input type="url" className="inputField" placeholder={user.userPhoto} disabled={!isEditing} />
          <label>Password</label>
          <input type="password" className="inputField" placeholder="Password" disabled={!isEditing} />
          <label>Re-write Password</label>
          <input type="password" className="inputField" placeholder="Re-write Password" disabled={!isEditing} />
        </div>
        <div className="userImageContainer">
          <img id="userImage" className="userImageProfile" src={user.userPhoto} />
        </div>
      </div>
    <div className="buttonContainer">
      <button id="editButton" className="myButton" onClick={handleEditClick}>Edit</button>
      {isEditing && <button id="saveButton" className="myButton">Save</button>}
    </div>
  </Modal>
);
}

export default UserModal;