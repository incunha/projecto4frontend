import React, { useState } from 'react';
import ModalAddUser from '../../../modal-addUser/modal-addUser';
import './button-addUser.css';

function AddUserButton() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button className="add-user-button" onClick={handleOpenModal}>Add User</button>
            {showModal && <ModalAddUser showLogin={false} onClose={handleCloseModal} />}
        </>
    );
}

export default AddUserButton;