import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../userStore';
import './modalUserDetails.css';

function UserDetailsModal({ isOpen, onClose }) {
  const user = useUserStore(state => state.selectedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user) {
      console.log(user);
      const names = user.name.split(' ');
      setFirstName(names[0]);
      setLastName(names[1]);
      setEmail(user.email);
      setContactNumber(user.contactNumber);
      setUserPhoto(user.userPhoto);
      setRole(user.role);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteTasksClick = async () => {
    const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/deleteAll/${user.username}`, {
      method: 'DELETE',
      headers: {
        Accept: "*/*",
        token: sessionStorage.getItem("token"),
      },
    });
    if (response.ok) {
      alert('User tasks deleted successfully');  
      useUserStore.getState().setUsers(fetchUsers());
      setIsEditing(false);
      onClose();
    } else {
      console.error('Failed to delete user tasks');
    }
  };

  const handleDeleteUserClick = async () => {
    const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/delete/${user.username}`, {
      method: 'DELETE',
      headers: {
        Accept: "*/*",
        token: sessionStorage.getItem("token"),
      },
    });
    if (response.ok) {
      alert('User deleted successfully');  
      useUserStore.getState().setUsers(fetchUsers());
      setIsEditing(false);
      onClose();
    } else {
      console.error('Failed to delete user');
    }
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
        username: user.username,
        contactNumber,
        userPhoto,
        role
      })
    });
    if (response.ok) {
      alert('User data updated successfully');  
      useUserStore.getState().setUsers(fetchUsers());
      setIsEditing(false);
      onClose();
    } else {
      console.error('Failed to update user data');
    }
  };

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="modalUserDetails">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} disabled={!isEditing} />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} disabled={!isEditing} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={!isEditing} />
          </label>
          <label>
            Username:
            <input type="text" value={user.username} disabled />
          </label>
          <label>
            Contact Number:
            <input type="text" value={contactNumber} onChange={e => setContactNumber(e.target.value)} disabled={!isEditing} />
          </label>
          <label>
            User Photo:
            <input type="text" value={userPhoto} onChange={e => setUserPhoto(e.target.value)} disabled={!isEditing} />
          </label>
          <label>
            Role:
            <input type="text" value={role} onChange={e => setRole(e.target.value)} disabled={!isEditing} /> 
          </label>
          <button type="button" onClick={handleEditClick}>Edit</button>
          {isEditing && <button type="button" onClick={handleSaveClick}>Save</button>}
        </form>
        <button type="button" onClick={handleDeleteTasksClick}>Delete User Tasks</button>
        <button type="button" onClick={handleDeleteUserClick}>Delete User</button>
      </div>
    </div>
  );
}

export default UserDetailsModal;