import React, { useState } from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import './css/PaymentForm.css';
import axios from 'axios'; // Import axios

function Confirmation() {
    const navigate=useNavigate()
    const location = useLocation();

    const match = location.state.match;
    const tickets = location.state.selectedTickets;
    const [form, setForm] = useState({client:localStorage.getItem('userId'),
        tickets:tickets ,
        Match:match._id,
        name: '',
        cardNumber: '', 
        expiryDate: '',
        securityCode: '',
        zipCode: ''
    });
    console.log(match,tickets,form);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let formErrors = {};

        if (!form.name.trim()) {
            formErrors.name = 'Name on card is required';
        }

        const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
        if (!form.cardNumber || !cardNumberRegex.test(form.cardNumber)) {
            formErrors.cardNumber = 'Valid card number is required (XXXX XXXX XXXX XXXX)';
        }

        const expiryDateRegex = /^\d{4}-\d{2}$/;  // YYYY-MM format for type="month"
        if (!form.expiryDate || !expiryDateRegex.test(form.expiryDate)) {
            formErrors.expiryDate = 'Valid expiry date is required (YYYY-MM)';
        }

        const securityCodeRegex = /^\d{3}$/;
        if (!form.securityCode || !securityCodeRegex.test(form.securityCode)) {
            formErrors.securityCode = 'Valid security code is required (3 digits)';
        }

        if (!form.zipCode.trim()) {
            formErrors.zipCode = 'ZIP/Postal Code is required';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:5000/api/save-payment', form,
               
                {
                    withCredentials: true,
                });
                console.log('Payment details submitted:', response.data);
                navigate('/Done');

            } catch (error) {
                console.error('Error submitting payment details:', error);
            }
        }
    };

    return (
        <div className="payment-form-container">
            <h2>Add Payment</h2>
            <div className="payment-icons">
                <img src="/image/visa.jpg" alt="Visa" />
                <img src="/image/OIP.jpg" alt="PayPal" />
            </div>
            <form onSubmit={handleSubmit}>
                <label>Name On Card</label>
                <input 
                    type="text" 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required 
                />
                {errors.name && <span className="error">{errors.name}</span>}
                
                <label>Card Number</label>
                <input 
                    type="text" 
                    name="cardNumber" 
                    value={form.cardNumber} 
                    onChange={handleChange} 
                    placeholder="XXXX XXXX XXXX XXXX" 
                    required 
                />
                {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                
                <div className="expiry-cvv">
                    <div>
                        <label>Expiry Date</label>
                        <input 
                            type="month" 
                            name="expiryDate" 
                            value={form.expiryDate} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
                    </div>
                    <div>
                        <label>Security Code</label>
                        <input 
                            type="text" 
                            name="securityCode" 
                            value={form.securityCode} 
                            onChange={handleChange} 
                            placeholder="CVV" 
                            required 
                        />
                        {errors.securityCode && <span className="error">{errors.securityCode}</span>}
                    </div>
                </div>
                
                <label>ZIP/Postal Code</label>
                <input 
                    type="text" 
                    name="zipCode" 
                    value={form.zipCode} 
                    onChange={handleChange} 
                    placeholder="XXXXX" 
                    required 
                />
                {errors.zipCode && <span className="error">{errors.zipCode}</span>}
                <br/>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default Confirmation;
