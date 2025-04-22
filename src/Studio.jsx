import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ChatWindow from '../components/ChatWindow';
import './Studio.css'; // Optional for styling

const Studio = () => {
  return (
    <div className="studio-container">
      <Topbar />
      <div className="studio-body">
        <Sidebar />
        <ChatWindow />
      </div>
    </div>
  );
};

export default Studio;