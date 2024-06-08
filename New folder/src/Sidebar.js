// src/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Sidebar.css'; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    toggleSidebar();
  };
  const isAdmin= localStorage.getItem("role")=="admin";
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
    </div>
  );
};
/*      <-- <Link to="/DoorsPage" onClick={toggleSidebar}>Doors</Link>-->
*/
export default Sidebar;