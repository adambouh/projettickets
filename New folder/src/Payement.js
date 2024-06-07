import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './css/Payementt.css';

function Payement() {
    const location = useLocation();
    const { selectedTickets, totalPrice } = location.state || {};

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/process-payment', {
            tickets: selectedTickets,
            totalPrice,
            paymentDetails
        })
        .then(response => {
            if (response.data.success) {
                alert('Payment successful!');
                // Redirect or perform additional actions
            } else {
                alert('Payment failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error processing payment:', error);
            alert('Payment failed. Please try again.');
        });
    };

    if (!selectedTickets || !totalPrice) {
        return <p>No tickets selected. Please go back and select your tickets.</p>;
    }

    return (
        <div className="payment-page">
            <h2>Payment Details</h2>
            <p>Total Price: {totalPrice}</p>
            <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Confirm Payment</button>
            </form>
        </div>
    );
}

export default Payement;
