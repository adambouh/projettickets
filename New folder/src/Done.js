import React from 'react';
import { Link } from 'react-router-dom';
import './css/Done.css'; // Import the CSS file for styling

const Done = () => {
    return (
        <div className="done-container">
            <div className="checkmark-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" className="checkmark">
                    <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
            <h1>Thank You!</h1>
            <p>Your payment has been processed and your tickets have been created successfully.</p>
            <p>Visit /MyTickets for your tickets shortly.</p>
            <Link to="/WelcomeScreen" className="home-link">Back to Home</Link>
        </div>
    );
};

export default Done;
