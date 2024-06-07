import React, { useState } from 'react';

function Guest() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        passportNumber: '',
        contactDetails: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Handle form submission (e.g., store data in state or context)
    };

    return (
        <div>
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                <label htmlFor="passportNumber">Passport/ID Number:</label>
                <input type="text" id="passportNumber" name="passportNumber" value={formData.passportNumber} onChange={handleInputChange} required />
                <label htmlFor="contactDetails">Contact Details:</label>
                <input type="text" id="contactDetails" name="contactDetails" value={formData.contactDetails} onChange={handleInputChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Guest;
