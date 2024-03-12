import React, { useState, useEffect } from 'react';
import './username.css';
import UserModal from './modal-user/userModal';

function UserName({ userName, userPhoto, updateUserInfo }) {
    const [firstName, setFirstName] = useState(userName ? userName.split(' ')[0] : '');
    const [userImage, setUserImage] = useState(userPhoto);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

      if (response.status === 403) {
        alert('Unauthorized');
        sessionStorage.clear();
        window.location.href = 'index.html';
      } else if (response.status === 200) {
        const user = await response.json();
        const names = user.name.split(' ');
        setFirstName(names[0]);
        setUserImage(user.userPhoto);
        if (typeof updateUserInfo === 'function') {
          updateUserInfo(user.name, user.userPhoto);
        }
      } else {
        console.error('Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userName) {
      setFirstName(userName.split(' ')[0]);
    }
    setUserImage(userPhoto);
  }, [userName, userPhoto]);

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