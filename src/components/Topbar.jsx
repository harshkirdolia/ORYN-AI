import React from 'react';
import logo from '../assets/logo3.svg'; // Make sure this path is correct
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-title">
        <img src={logo} alt="Logo" className="studio-logo" />
        <span>Design Studio</span>
      </div>
      <div className="topbar-actions">
        <button className="topbar-btn">Profile</button>
        <button className="topbar-btn">Logout</button>
      </div>
    </div>
  );
};

export default Topbar;