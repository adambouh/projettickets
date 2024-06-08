import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Admin.css';

function AdminStadiums() {  
    const [stadiums, setStadiums] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('http://localhost:5000/api/stade/all')
        .then(response => {
          setStadiums(response.data);
        })
        .catch(error => {
          console.error('Error fetching stadiums:', error);
        });
    }, []);
  
    const handleStadiumClick = (stadiumId) => {
      navigate(`/admin/stadium/${stadiumId}`);
    };
  
    return (
      <div className="stadiums-list">
        <h2>All Stadiums</h2>
        <ul>
          {stadiums.map(stadium => (
            <li key={stadium._id} className="stadium-item" onClick={() => handleStadiumClick(stadium._id)}>
              <strong>{stadium.name}</strong><br />
              Location: {stadium.location}<br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  

export default AdminStadiums;
