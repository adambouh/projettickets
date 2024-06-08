import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Admin.css';

function MatchDetail() {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [formData, setFormData] = useState({});
  const [stadiums, setStadiums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch match details
    axios.get(`http://localhost:5000/api/matches/${matchId}`)
      .then(response => {
        setMatch(response.data);
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching match:', error);
      });

    // Fetch stadiums
    axios.get('http://localhost:5000/api/stade/all')  // Adjust the endpoint as needed
      .then(response => {
        setStadiums(response.data);
      })
      .catch(error => {
        console.error('Error fetching stadiums:', error);
      });
  }, [matchId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/matches/${matchId}`, formData)
      .then(response => {
        setMatch(response.data);
        alert('Match updated successfully');
      })
      .catch(error => {
        console.error('Error updating match:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/matches/${matchId}`)
      .then(() => {
        alert('Match deleted successfully');
        navigate('/admin/matches');
      })
      .catch(error => {
        console.error('Error deleting match:', error);
      });
  };

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div className="match-detail">
      <h2>Edit Match</h2>
      <form>
        <label>
          Name of the match:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Home Team Country:
          <input type="text" name="home_team_country" value={formData.home_team_country} onChange={handleInputChange} />
        </label>
        <label>
          Away Team Country:
          <input type="text" name="away_team_country" value={formData.away_team_country} onChange={handleInputChange} />
        </label>
        <label>
          Date:
          <input type="datetime-local" name="date" value={new Date(formData.date).toISOString().slice(0, 16)} onChange={handleInputChange} />
        </label>
        <label>
          Location:
          <select name="stade" value={formData.stade} onChange={handleInputChange}>
            <option value="">Select a stadium</option>
            {stadiums.map(stadium => (
              <option key={stadium._id} value={stadium._id}>
                {stadium.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <button onClick={handleUpdate}>Update Match</button>
      <button onClick={handleDelete} style={{ backgroundColor: '#cd2828' }}>Delete Match</button>
    </div>
  );
}

export default MatchDetail;
