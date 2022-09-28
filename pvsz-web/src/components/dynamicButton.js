import React from 'react';
import './dynamicButton.scss';

export default function DynamicButton() {

    function componentDidMount()
    {
        const container = document.querySelector('.buttonContainer')
        container.addEventListener('animationend', () => {
            container.classList.remove('active');
        });
    }

    return (
        <body>
                <div className="buttonContainer">
                        <span className="mas">Submitted</span>
                        <button id='work' type="button" name="Hover">SIGN IN</button>
                </div>
        </body>
);
}