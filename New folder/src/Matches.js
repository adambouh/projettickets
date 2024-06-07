import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Matches.css';

function Matches() {
    const [matches, setMatches] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
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

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const filterMatches = (matches) => {
        if (!selectedCountry) return matches;
        return matches.filter(match =>
            match.home_team_country.includes(selectedCountry) || match.away_team_country.includes(selectedCountry)
        );
    };
    const handleMatchClick = (match) => {
        console.log("Received state in TicketQuantityPage:", { match });
        navigate('/Category', { state: { Match: match } });
      };
    return (
        <div>
            <h2>Select Your Ticket</h2>
            <div className="select-container">
                <label htmlFor="countrySelect">Select Country or Team:</label>
                <select id="countrySelect" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">All</option>
                    {Array.from(new Set(matches.flatMap(match => [match.home_team_country, match.away_team_country]))).map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>

            <h3>Matches</h3>
            <ul>
                {filterMatches(matches).map(match => (
                   <li
                   key={match.id}
                   style={{ color: '#212529', cursor: 'pointer' }}
                   onClick={() => handleMatchClick(match)}
                 >
                   <strong>{match.home_team_country} vs {match.away_team_country}</strong> - {new Date(match.date).toLocaleString()}
                   
                 </li>
                ))}
            </ul>
            <footer className="footer">
                <p>&copy; 2024 World Cup Ticketing App. All rights reserved.</p>
                <p>Contact us: support@worldcuptickets.com</p>
            </footer>
        </div>
    );
}

export default Matches;
