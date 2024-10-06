import React from 'react';
import './Button.css';

const Button = ({ onClick, text }) => {
    return (
        <button className='custom-button' onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
