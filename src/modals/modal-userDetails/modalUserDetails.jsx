import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../userStore';
import './modalUserDetails.css';
import ConfirmationModal from '../modal-confirmation/confirmationModal';

function UserDetailsModal({ isOpen, onClose }) {
  const user = useUserStore(state => state.selectedUser);
  const active = useUserStore(state => state.activeUser);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [role, setRole] = useState('');
  const roles = [
    { display: 'Developer', value: 'developer' },
    { display: 'Scrum Master', value: 'ScrumMaster' },
    { display: 'Product Owner', value: 'Owner' },
  ];

 

  useEffect(() => {
    if (user) {
      const names = user.name.split(' ');
      setFirstName(names[0] || '');
      setLastName(names[1] || '');
      setEmail(user.email || '');
      setContactNumber(user.contactNumber || '');
      setUserPhoto(user.userPhoto || '');
      setRole(user.role || '');
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteTasksClick = () => {
    setConfirmationAction(() => handleDeleteTasks);
    setConfirmationMessage('Are you sure you want to delete all tasks?'); 
    setIsConfirmationModalOpen(true);
  };
  

  const handleDeleteUserClick = () => {
    setConfirmationAction(() => handleDeleteUser);
    setConfirmationMessage('Are you sure you want to delete this user?'); 
    setIsConfirmationModalOpen(true);
  };

  const handleSaveClick = () => {
    setConfirmationAction(() => handleSave);
    setConfirmationMessage('Are you sure you want to save changes?'); 
    setIsConfirmationModalOpen(true);
  };

  const handleRestoreUserClick = () => {
    setConfirmationAction(() => handleRestoreUser);
    setConfirmationMessage('Are you sure you want to restore this user?'); 
    setIsConfirmationModalOpen(true);
  };

  const handleRestoreUser = async () => {
    const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/restore/${user.username}`, {
      method: 'POST',
      headers: {
        Accept: "*/*",
        token: sessionStorage.getItem("token"),
      },
    });
    if (response.ok) {
      alert('User restored successfully');  
      useUserStore.getState().fetchInactiveUsers();
      setIsEditing(false);
      onClose();
    } else {
      console.error('Failed to restore user');
    }
  };

  const handleDeleteTasks = async () => {
    const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/deleteAll/${user.username}`, {
      method: 'DELETE',
      headers: {
        Accept: "*/*",
        token: sessionStorage.getItem("token"),
      },
    });
    if (response.ok) {
      alert('User tasks deleted successfully');  
      useUserStore.getState().fetchActiveUsers();
      setIsEditing(false);
      onClose();
    } else {
      console.error('Failed to delete user tasks');
    }
  };

  const handleDeleteUser = async () => {
    const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/delete/${user.username}`, {
      method: 'DELETE',
      headers: {
        Accept: "*/*",
        token: sessionStorage.getItem("token"),
      },
    });
    if (response.ok) {
      alert('User deleted successfully');  
      useUserStore.getState().fetchActiveUsers();
      setIsEditing(false);
      onClose();
    } else {
      console.error('Failed to delete user');
    }
  };

  const handleSave = async () => {
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
      useUserStore.getState().fetchActiveUsers();
      setIsEditing(false);
      onCloseModal();
    } else {
      console.error('Failed to update user data');
    }
  };

  const onCloseModal = () => {
    setIsEditing(false); 
    onClose();
  };

  const handleConfirm = () => {
    if (confirmationAction) {
      confirmationAction();
    }
    setIsConfirmationModalOpen(false);
  };

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className={`modalUserDetails ${isOpen ? 'modal-open' : ''}`}>
    <div className="modal-overlay" onClick={onClose}></div>
    <div className="modal-contentUserDetails">
      <span className="close" onClick={onCloseModal}>&times;</span>
      <div className="modal-content-left">
        <h1 className='userDetailsTitle'>{user.name}</h1>
        <form className ="formUserDetails">
          <label className='labelUserDetails'>
            First Name:
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} disabled={!isEditing} />
          </label>
          <label className='labelUserDetails'>
            Last Name:
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} disabled={!isEditing} />
          </label>
          <label className='labelUserDetails'>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={!isEditing} />
          </label>
          <label className='labelUserDetails'>
            Username:
            <input type="text" value={user.username} disabled />
          </label>
          <label className='labelUserDetails'>
            Contact Number:
            <input type="text" value={contactNumber} onChange={e => setContactNumber(e.target.value)} disabled={!isEditing} />
          </label>
          <label className='labelUserDetails'>
            User Photo:
            <input type="text" value={userPhoto} onChange={e => setUserPhoto(e.target.value)} disabled={!isEditing} />
          </label>
          <label className='labelUserDetails'>
          Role:
          <select value={role} onChange={e => setRole(e.target.value)} disabled={!isEditing}>
            {roles.map(role => (
              <option key={role.value} value={role.value}>
                {role.display}
              </option>
            ))}
          </select>
        </label>
        {!isEditing && active && <button className = 'myButton' type="button" onClick={handleEditClick}>Edit</button>}
        {!active && <button className='myButton' type="button" onClick={handleRestoreUserClick}>Restore User</button>}
            {isEditing && <button className = 'myButton' type="button" onClick={handleSaveClick}>Save</button>}
          </form>
          <div className="button-groupUserDetails">
            <button className = 'myButton' type="button" onClick={handleDeleteTasksClick}>Delete Tasks</button>
            <button className='myButton' type="button" onClick={handleDeleteUserClick}>Delete User</button>
          </div>
        </div>
        <img src={userPhoto} alt="User" className="userDetailsPhoto" />
      </div>
      <ConfirmationModal
  isOpen={isConfirmationModalOpen}
  onRequestClose={() => setIsConfirmationModalOpen(false)}
  message={confirmationMessage} 
  onConfirm={handleConfirm}
/>
    </div>
  );
}

export default UserDetailsModal;