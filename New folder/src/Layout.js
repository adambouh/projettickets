// src/Layout.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './css/Sidebar.css';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div>
      <div className="headbar">
        <span style={{fontSize: '30px', cursor: 'pointer'}} onClick={toggleSidebar}>&#9776; </span>
        <span style={{fontSize: '40px', cursor: 'pointer'}}>Tickets</span></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
