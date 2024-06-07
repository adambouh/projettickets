import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Admin.css';

function AdminStadiums() {
  const [stadiums, setStadiums] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/stadiums/all')
      .then(response => {
        setStadiums(response.data);
      })
      .catch(error => {
        console.error('Error fetching stadiums:', error);
      });
  }, []);
  
  return (
    <div className="admin-container">
      <h2>Stadium List</h2>
      <ul>
        {stadiums.map(stadium => (
          <li key={stadium._id} className="stadium-item">
            <strong>{stadium.name}</strong><br />
            Location: {stadium.location}<br />
            Capacity: {stadium.categories.reduce((sum, category) => sum + category.capacity, 0)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminStadiums;
