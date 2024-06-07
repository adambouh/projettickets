import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Category.css';

function Category() {
    const location = useLocation();
    const match = location.state.Match;
    const [categories, setCategories] = useState([]);
    const [ticketQuantities, setTicketQuantities] = useState([]);
    const [Stade, setStade] = useState({});
    const [confirmedTickets, setConfirmedTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvailableTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tickets/available-tickets/${match._id}`);
                const categoriesData = response.data;
                setCategories(categoriesData);
                setTicketQuantities(categoriesData.map(() => 0));
            } catch (error) {
                console.error('Error fetching available tickets:', error);
            }
        };
        fetchAvailableTickets();

        const fetchStadium = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/stade/${match.stade}`);
                const stadiumData = response.data;
                setStade(stadiumData);
            } catch (error) {
                console.error('Error fetching stadium data:', error);
            }
        };
        fetchStadium();
    }, [match]);

    const handleNumTicketsChange = (index, event) => {
        const newQuantities = [...ticketQuantities];
        newQuantities[index] = Math.min(parseInt(event.target.value, 10), 6); // Limit the number of tickets to 6
        setTicketQuantities(newQuantities);
    };

    const handleConfirm = () => {
        const selectedTickets = categories.map((category, index) => ({
            category: index+1,
            price: category.price,
            quantity: ticketQuantities[index],
            subtotal: category.price * ticketQuantities[index],
        })).filter(ticket => ticket.quantity > 0);

        setConfirmedTickets(selectedTickets);
        navigate('/confirmation', { state: { match, selectedTickets } });
    };

    return (
        <div className="container">
            <h2>Stadium</h2>
            <img src={`${Stade.path}`} alt="Stadium" style={{width:"100%"}} />

            <h2>Tickets selection for {match.home_team_country} vs {match.away_team_country}</h2>
            {categories.map((category, index) => (
                <div key={category.category} className="category-container">
                    <span>{category.category} - Price: ${category.price} - Available: {category.available} - </span>
                    <label htmlFor={`numTickets-${index}`} className="label">Category: {index + 1} </label>
                    <input
                        type="number"
                        id={`numTickets-${index}`}
                        value={ticketQuantities[index]}
                        onChange={(event) => handleNumTicketsChange(index, event)}
                        className="input"
                        min="0"
                        max="6"
                    />
                    <span> Subtotal: ${category.price * ticketQuantities[index]}</span>
                </div>
            ))}
            <p className="total-price">Total Price: ${categories.reduce((acc, category, index) => acc + (category.price * ticketQuantities[index]), 0)}</p>
            <button onClick={handleConfirm} className="confirmation-button">Confirm</button>

            {confirmedTickets.length > 0 && (
                <div className="confirmed-tickets">
                    <h2>Confirmed Tickets</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confirmedTickets.map((ticket, index) => (
                                <tr key={index}>
                                    <td>{ticket.category}</td>
                                    <td>${ticket.price}</td>
                                    <td>{ticket.quantity}</td>
                                    <td>${ticket.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Category;
