import React, { useState } from 'react';
import './menuAside.css';

function MenuAside() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={handleToggle}>
                ☰
            </button>
            {isOpen && (
                <div>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            )}
        </div>
    );
}

export default MenuAside;