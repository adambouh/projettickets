import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/Ticket.css';

function TicketDetail() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [stadium, setStadium] = useState(null);
  const [doorFrequencies, setDoorFrequencies] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tickets/${ticketId}`)
      .then(response => {
        setTicket(response.data);
        console.log(response.data.match.stade);
        return axios.get(`http://localhost:5000/api/stade/${response.data.match.stade}`);
      })
      .then(response => {
        setStadium(response.data);
      })
      .catch(error => {
        console.error('Error fetching ticket or stadium:', error);
      });
  }, [ticketId]);

  const handleCancel = () => {
    setIsCanceling(true);
    axios.patch(`http://localhost:5000/api/tickets/cancel/${ticketId}`)
      .then(response => {
        setTicket(prevTicket => ({
          ...prevTicket,
          status: 'canceled'
        }));
        setIsCanceling(false);
      })
      .catch(error => {
        console.error('Error canceling ticket:', error);
        setIsCanceling(false);
      });
  };

  const handleShowDoorFrequencies = () => {
    axios.get(`http://localhost:5000/api/stade/${ticket.match.stade}/doors/crowd-levels`)
      .then(response => {
        setDoorFrequencies(response.data);
      })
      .catch(error => {
        console.error('Error fetching door frequencies:', error);
      });
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  const createdAt = new Date(ticket.createdAt);
  const isMoreThan24Hours = (new Date() - createdAt) > 24 * 60 * 60 * 1000;

  return (
    <div className="ticket-container">
      <h2>Ticket Details</h2>
      <div className="ticket-detail">
        <strong>Match: {ticket.match.home_team_country} vs {ticket.match.away_team_country}</strong><br />
        Category: {ticket.category}<br />
        Date: {new Date(ticket.match.date).toLocaleString()}<br />
        Price: ${ticket.price}<br />
        <div>
          <img src={ticket.qrCode} alt="QR Code" />
        </div>
        {stadium && (
          <div className="stadium-details">
            <h3>Stadium Details</h3>
            Name: {stadium.name}<br />
            Location: {stadium.location}<br />
          </div>
        )}
       
        {!doorFrequencies && <button onClick={handleShowDoorFrequencies}>
          Show Door Frequencies
        </button>}
        {doorFrequencies && (
          <div className="door-frequencies">
            <h3>Door Frequencies</h3>
            <ul>
              {Object.entries(doorFrequencies).map(([door, frequency]) => (
                <li key={door}>{door}: {frequency}%</li>
              ))}
            </ul>
          </div>
        )}
         {ticket.status === 'canceled' ? (
          <div className="canceled-message">(Ticket Canceled)</div>
        ) : (
          <button
            onClick={handleCancel}
            disabled={isMoreThan24Hours || isCanceling}
            className={isMoreThan24Hours ? 'disabled-button' : ''}
          >
            {isCanceling ? 'Canceling...' : 'Cancel Ticket'}
          </button>
        )}
      </div>
    </div>
  );
}

export default TicketDetail;
