import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import './css/Ticket.css';

function MyTickets() {
  const navigate=useNavigate()

  const [tickets, setTickets] = useState([]);
  const clientId = localStorage.getItem('userId'); // Replace with the actual client ID, possibly fetched from auth context or state

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tickets/client/${clientId}`)
      .then(response => {
        setTickets(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  }, [clientId]);

  const handleTicketClick = (ticketId) => {
    navigate(`/ticket/${ticketId}`);
  };
  return (
    <div >
      <h2>My Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id} className="ticket-item" onClick={() => handleTicketClick(ticket._id)}>
            <strong>Match: {ticket.match.home_team_country} vs {ticket.match.away_team_country} {ticket.status === 'canceled' ? (
          <span className="canceled-message" style={{ fontSize:"14px"}}>( Canceled)</span>
        ): <div />}</strong><br />
            
            Category: {ticket.category}<br />
            Date: {new Date(ticket.match.date).toLocaleString()}<br />
            Price: ${ticket.price}
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

export default MyTickets;
