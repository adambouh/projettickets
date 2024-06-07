import React, { useState } from "react";
import "./css/Singup.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import  validation  from  "./Singvalidation";
import { useNavigate } from 'react-router-dom';



function Singup() {
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        firstName:"",
        lastName:"",
        country:"",
        passport:"",
        password2:""
        

    });
    

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value }));
        
    };
   

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values)); // Assuming this sets the errors state correctly
    
        // Validate that all required fields are present and have correct data types
        if (errors.firstName === "" && errors.lastName === "" && errors.country === "" && errors.passport === "" && errors.password === "" && errors.email === "" && errors.password2 === "") {
            axios.post('http://localhost:8080/singup', values)
                .then(res => {
                    // Check if the response contains an error indicating that the email already exists
                    if (res.data.error && res.data.error === "Email already exists") {
                        setErrorMessage("Email already exists");
                    } else {
                        navigate('/');
                    }
                })
                .catch(err => console.log("error", err));
        } else {
            console.log("Some required fields are missing or invalid");
        }
    }
    
    
    return (
        <div className="signup-container">
            <form method="post" action="/signup" className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                       name='firstName'
                        placeholder="Enter your first name"
                        
                        onChange={handleInput}
                        
                    />  {errors.firstName && <span className="text-danger">{errors.firstName} </span>}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                       
                        name='lastName'
                        placeholder="Enter your last name"
                       
                        onChange={handleInput}
                        
                    />{errors.lastName && <span className="text-danger">{errors.lastName} </span>}
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        name='country'
                        placeholder="Enter your country"
                        
                        onChange={handleInput}
                      
                    />{errors.country && <span className="text-danger">{errors.country} </span>}
                </div>
                <div className="form-group">
                    <label htmlFor="passport">Passport/QID</label>
                    <input
                        type="text"
                        name='passport'
                        placeholder="Enter your passport or QID number"
                       
                        onChange={handleInput}
                        
                    />{errors.passport && <span className="text-danger">{errors.passport} </span>}
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder="Enter your email"
                        
                        onChange={handleInput}
                        
                    />{errors.email && <span className="text-danger">{errors.email} </span>}
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}

                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name='password'
                        placeholder="Enter your password"
                        
                        onChange={handleInput}
                        
                    />{errors.password && <span className="text-danger">{errors.password} </span>}
                </div>
                <div className='form-group'>
                    <label htmlFor="password2">Confirme Password</label>
                    <input
                        type="password"
                        name='password2'
                        placeholder="Confirme your password"
                        
                        onChange={handleInput}
                        
                    />{errors.password2 && <span className="text-danger">{errors.password2} </span>}
                </div>
                <button type="submit">Sing Up</button>
               <p>  Have an acount ?<Link to ="/" className="sing" >  Sing In</Link></p> 
        </form>
     </div>
    );
}
export default Singup;