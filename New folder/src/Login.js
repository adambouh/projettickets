import React, { useState } from "react";
import "./css/Login.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleLoginSuccess = (userId,role) => {
        // Store user ID in localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        // Redirect to WelcomeScreen
        navigate('/WelcomeScreen');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                username: values.username,
                password: values.password,
            }, {
                withCredentials: true,
            });

            setErrorMessage(response.data.message);
            handleLoginSuccess(response.data.id,response.data.role); // Redirect to WelcomeScreen after successful login
        } catch (error) {
            setErrorMessage('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input
                        name='username'
                        type="text"
                        placeholder="Enter your Username"
                        value={values.username}
                        onChange={handleInput}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input
                        name='password'
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleInput}
                    />
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <Link to="/ForgotPassword">Forgot Password?</Link>
                </div>
                <button type="submit">Login</button>
                <p>
                    Don't have an account?
                    <Link to="/signup" className="form-link">Create Account</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
