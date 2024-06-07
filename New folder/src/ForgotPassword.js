import React, { useState } from 'react';
import './css/ForgotPassword.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/forgotPassword', { email })
            .then(res => {
                if (res.data.status === 'success') {
                    setMessage('An email has been sent with instructions to reset your password.');
                } else if (res.data.status === 'fail') {
                    setMessage('Email not found. Please check your email address.');
                }
            })
            .catch(err => {
                console.error('Error:', err);
            });
    };

    return (
        <div className="forgot-password-container">
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>
                <p>Please enter your email address. We will send you a link to reset your password.</p>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
                {message && <p className="message">{message}</p>}
                <p>Remembered your password? <Link to="/">Login</Link></p>
            </form>
        </div>
    );
}

export default ForgotPassword;
