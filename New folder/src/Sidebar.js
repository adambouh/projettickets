// src/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Sidebar.css'; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    toggleSidebar();
  };
  return (
    <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="#" className="closebtn" onClick={handleCloseClick}>&times;</a>
      <Link to="/WelcomeScreen" onClick={toggleSidebar}>Home</Link>
      <Link to="/My-tickets" onClick={toggleSidebar}>My tickets</Link>
      <Link to="/DoorsPage" onClick={toggleSidebar}>Doors</Link>
    </div>
  );
};

export default Sidebar;