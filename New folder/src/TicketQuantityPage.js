import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function TicketQuantityPage() {
    const location = useLocation();
    const { categoryName, categoryPrice } = location.state || {};
    const [numTickets, setNumTickets] = useState(1);

    useEffect(() => {
        if (!categoryName || !categoryPrice) {
            // Rediriger l'utilisateur vers la page de sélection de catégorie si les informations nécessaires ne sont pas disponibles
            // history.push('/category-selection');
            console.error('Category information missing. Please select a category first.');
        }
    }, [categoryName, categoryPrice]);

    const handleNumTicketsChange = (event) => {
        setNumTickets(parseInt(event.target.value, 10));
    };

    if (!categoryName || !categoryPrice) {
        return <div>Error: Category information missing. Please select a category first.</div>;
    }

    return (
        <div>
            <h2>Select Number of Tickets</h2>
            <p>Category: {categoryName}</p>
            <p>Price per Ticket: ${categoryPrice}</p>
            <label htmlFor="numTickets">Number of Tickets:</label>
            <input type="number" id="numTickets" value={numTickets} onChange={handleNumTicketsChange} />
            <p>Total Price: $ {numTickets * categoryPrice}</p>
        </div>
    );
}

export default TicketQuantityPage;
