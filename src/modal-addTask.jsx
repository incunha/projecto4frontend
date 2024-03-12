import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './modal-addTask.css';

const TaskModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="task-modal"
            overlayClassName="task-modal-overlay"
        >
            <h2>Add Task</h2>
            <input type="text" placeholder="Title" />
            <textarea placeholder="Description" />
            <div>
                <button className="priority-button low">Low</button>
                <button className="priority-button medium">Medium</button>
                <button className="priority-button high">High</button>
            </div>
            <div>
                <button className="status-button">To Do</button>
                <button className="status-button">Doing</button>
                <button className="status-button">Done</button>
            </div>
            <DatePicker selected={new Date()} onChange={date => console.log(date)} />
            <DatePicker selected={new Date()} onChange={date => console.log(date)} />
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default TaskModal;