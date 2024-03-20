import React, { useState } from 'react';
import { useUserStore } from '../../../../userStore';
import UserModal from '../../../modals/modal-user/userModal';
import './editProfileButton.css';

function EditProfileButton({ updateUserInfo }) {
  const { fetchUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    fetchUser();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className = "editeProfile-button" onClick={handleOpenModal}>Edit Profile</button>
      <UserModal isOpen={isModalOpen} onRequestClose={handleCloseModal} updateUserInfo={updateUserInfo} />
    </div>
  );
}

export default EditProfileButton;