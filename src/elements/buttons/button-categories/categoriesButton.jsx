import React from 'react';
import './categoriesButton.css'

const CategoriesButton = ({ onClick }) => {
    return (
        <button className="add-task-button" onClick={onClick}>
            Categories
        </button>
    );
};

export default CategoriesButton;