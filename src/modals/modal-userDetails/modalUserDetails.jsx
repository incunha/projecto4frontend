import React from 'react';
import { useUserStore } from '../../../userStore';
import './modalUserDetails.css';

function UserDetailsModal({ isOpen, onClose }) {
  const { selectedUserForDetails: user } = useUserStore();
  if (!isOpen || !user) {
    return null;
  }

  const names = user.name.split(' ');
  const firstName = names[0];
  const lastName = names[1];

  return (
    <div className="modalUserDetails">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form>
          <label>
            First Name:
            <input type="text" value={firstName} disabled />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} disabled />
          </label>
          <label>
            Email:
            <input type="text" value={user.email} disabled />
          </label>
          <label>
            Username:
            <input type="text" value={user.username} disabled />
          </label>
          <label>
            Contact:
            <input type="text" value={user.contactNumber} disabled />
          </label>
          <label>
            Role:
            <input type="text" value={user.role} disabled />
          </label>
        </form>
      </div>
    </div>
  );
}

export default UserDetailsModal;