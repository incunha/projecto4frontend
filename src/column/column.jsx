import React from 'react';
import './column.css';

function Column({ title }) {
    return (
        <div className="column">
            <h2>{title}</h2>
            {}
        </div>
    );
}

export default Column;