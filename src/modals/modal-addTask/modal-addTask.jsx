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
            <input type="text" placeholder="Title" className="title-input"/>
            <textarea placeholder="Description" />
            <div className="button-group">
    <div className="field-container">
        <label>Priority</label>
        <div>
            <button className="priority-button low">Low</button>
            <button className="priority-button medium">Medium</button>
            <button className="priority-button high">High</button>
        </div>
    </div>

    <div className="field-container">
        <label>Status</label>
        <div>
        <button className="status-button to-do">To Do</button>
        <button className="status-button doing">Doing</button>
        <button className="status-button done">Done</button>
        </div>
    </div>
</div>

<div className="dates-container">
    <div className="field-container">
        <label>Initial Date</label>
        <DatePicker selected={new Date()} onChange={date => console.log(date)} />
    </div>

    <div className="field-container">
        <label>Final Date</label>
        <DatePicker selected={new Date()} onChange={date => console.log(date)} />
    </div>
</div>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default TaskModal;