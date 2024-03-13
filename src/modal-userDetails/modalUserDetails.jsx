import React from 'react';

function UserDetailsModal({ user, isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form>
          <label>
            Username:
            <input type="text" value={user.username} disabled />
          </label>
          <label>
            Name:
            <input type="text" value={user.name} disabled />
          </label>
          <label>
            Role:
            <input type="text" value={user.role} disabled />
          </label>
          {/* Add more fields as needed */}
        </form>
      </div>
    </div>
  );
}

export default UserDetailsModal;