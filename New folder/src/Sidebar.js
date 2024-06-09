// src/Sidebar.js

import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './css/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate=useNavigate();
  const handleCloseClick = (e) => {
    e.preventDefault();
    toggleSidebar();
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Redirect to the home page
    navigate("/");
  };

  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="#" className="closebtn" onClick={handleCloseClick}>&times;</a>
      <Link to="/WelcomeScreen" onClick={toggleSidebar}>Home</Link>
      <Link to="/My-tickets" onClick={toggleSidebar}>My tickets</Link>
      {isAdmin && (
        <>
          <Link to="/admin/stadiums" onClick={toggleSidebar}>Stadiums</Link>
          <Link to="/admin/matches" onClick={toggleSidebar}>Matches</Link>
        </>
      )}
            <a href="/" className="logout-btn" style={{  color: "#c43030"}} onClick={() => { localStorage.clear(); toggleSidebar(); }}>Déconnexion</a>

    </div>
  );
};

export default Sidebar;
