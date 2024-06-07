import React from 'react';
import { useLocation } from 'react-router-dom';
//import './Success.css';

function Success() {
    const location = useLocation();
    const { selectedTicket } = location.state || {};

    if (!selectedTicket) {
        return <div>No ticket selected</div>;
    }

    return (
        <div className="success-container">
            <h2>Payment Successful!</h2>
            <p>Your payment was processed successfully. Here are your ticket details:</p>
            <div className="ticket-details">
                <p><strong>Match:</strong> {selectedTicket.home_team_country} vs {selectedTicket.away_team_country}</p>
                <p><strong>Date:</strong> {new Date(selectedTicket.datetime).toLocaleString()}</p>
                <p><strong>Venue:</strong> {selectedTicket.venue}</p>
                <p><strong>QR Code:</strong> {/* Placeholder for QR Code */}</p>
            </div>
        </div>
    );
}

export default Success;
