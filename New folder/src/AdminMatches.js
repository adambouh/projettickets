import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Admin.css';

function AdminMatches() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/matches/all')
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
      });
  }, []);

  const handleEditClick = (matchId) => {
    navigate(`/admin/match/${matchId}`);
  };

  return (
    <div className="admin-container">
      <h2>Match List</h2>
      <ul>
        {matches.map(match => (
          <li key={match._id} className="match-item" onClick={() => handleEditClick(match._id)}>
            <strong>{match.home_team_country} vs {match.away_team_country}</strong><br />
            Date: {new Date(match.date).toLocaleString()}<br />

          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminMatches;
