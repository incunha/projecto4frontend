import React, { useState, useEffect } from 'react';
import './username.css';
import UserModal from '../../modals/modal-user/userModal';
import { useUserStore } from '../../../userStore';

function UserName({ updateUserInfo }) {
  const { fetchUser, selectedUser, UserName } = useUserStore();
  const [firstName, setFirstName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (selectedUser) {
      const names = selectedUser.name.split(' ');
      setFirstName(names[0]);
      setUserImage(selectedUser.userPhoto);

      if (typeof updateUserInfo === 'function') {
        updateUserInfo(selectedUser.name, selectedUser.userPhoto);
      }
    }
  }, [selectedUser, updateUserInfo]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="userName">
      Welcome, <button onClick={handleOpenModal}>{firstName}</button>
      <img src={userImage} alt="User" className="userImage" />
      <UserModal isOpen={isModalOpen} onRequestClose={handleCloseModal} updateUserInfo={updateUserInfo} />
    </div>
  );
}

export default UserName;