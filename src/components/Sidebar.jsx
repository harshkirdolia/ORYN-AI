import React from 'react';
import './Sidebar.css';
import logo from '../assets/logo5.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="grid-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="1" />
            <rect x="15" y="3" width="6" height="6" rx="1" />
            <rect x="3" y="15" width="6" height="6" rx="1" />
            <rect x="15" y="15" width="6" height="6" rx="1" />
          </svg>
        </button>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search" />
        <span className="shortcut">⌘ K</span>
      </div>

      <ul className="menu">
        <li className="menu-item active">
          <span className="icon blue" /> AI Chat
        </li>
        <li className="menu-item"><span className="icon" /> Projects</li>
        <li className="menu-item">
          <span className="icon" /> Community <span className="tag-new">NEW</span>
        </li>
        <li className="menu-item"><span className="icon" /> History</li>
        <li className="menu-divider">Settings & Help</li>
        <li className="menu-item"><span className="icon" /> Settings</li>
        <li className="menu-item"><span className="icon" /> Help</li>
      </ul>

      <div className="bottom-section">
        <div className="mode-toggle">
          <button className="active">🌞 Light</button>
          <button>🌜 Dark</button>
        </div>
        <div className="profile">
          <img className="avatar" src="https://i.pravatar.cc/100" alt="User" />
          <div className="user-details">
            <div className="name">Emilia Caitlin</div>
            <div className="email">hey@unspace.agency</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;