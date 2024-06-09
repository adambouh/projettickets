// src/Singup.js
import React, { useState } from "react";
import "./css/Singup.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import validation from "./Singvalidation";

function Singup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 
  const [values, setValues] = useState({
    username: "",
    password: "",
    password2: ""
  });

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.username)) {
        setErrorMessage('Please enter a valid email address.');
        return;
    }
    setErrors(validation(values)); // Assuming this sets the errors state correctly

    if (!errors.username && !errors.password && !errors.password2) {
      axios.post('http://localhost:5000/api/users/', { username: values.username, password: values.password })
        .then(res => {
          navigate('/');
        })
        .catch(err => {
          if (err.response && err.response.data.message === "Username already exists") {
            setErrorMessage("Username already exists");
          } else {
            console.error("Error registering user:", err);
          }
        });
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            name='username'
            placeholder="Enter your email"
            onChange={handleInput}
            required
          />
          {errors.username && <span className="text-danger">{errors.username}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name='password'
            placeholder="Enter your password"
            onChange={handleInput}
          />
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name='password2'
            placeholder="Confirm your password"
            onChange={handleInput}
          />
          {errors.password2 && <span className="text-danger">{errors.password2}</span>}
        </div>
        <button type="submit">Sign Up</button>
        <p>Have an account? <Link to="/" className="sing">Sign In</Link></p>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Singup;
