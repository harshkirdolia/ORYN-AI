import React, { useRef, useEffect, useState } from 'react';
import './ChatWindow.css';

// Corrected SVG Icons with camelCase properties
const ExpandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DesignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l10 5 10-5" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const DefineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IdeateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PrototypeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
    <line x1="2" y1="7" x2="22" y2="7" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="17" x2="22" y2="17" />
  </svg>
);

const TestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    <line x1="12" y1="12" x2="12" y2="12" />
  </svg>
);

const ImplementIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <line x1="9" y1="9" x2="15" y2="15" />
    <line x1="15" y1="9" x2="9" y2="15" />
  </svg>
);

const EmpathizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v13h3v-6h2l3 3 3-3h2V7a5 5 0 00-5-5z" />
    <path d="M10 10H7c-2 0-3 1-3 3v5c0 2 1 3 3 3h3" />
  </svg>
);

const getIconForStage = (stage) => {
  switch (stage) {
    case 'Design': return <DesignIcon />;
    case 'Empathize': return <EmpathizeIcon />;
    case 'Define': return <DefineIcon />;
    case 'Ideate': return <IdeateIcon />;
    case 'Prototype': return <PrototypeIcon />;
    case 'Test': return <TestIcon />;
    case 'Implement': return <ImplementIcon />;
    default: return null;
  }
};

const stagePrompts = {
  Design: "How do I structure my overall design process across all stages?",
  Empathize: "How do I understand my users' needs better in the Empathize stage?",
  Define: "How can I define a strong problem statement for my project?",
  Ideate: "Can you give me some ideation techniques for brainstorming solutions?",
  Prototype: "What are some tools and best practices for prototyping ideas?",
  Test: "How do I conduct usability tests with users?",
  Implement: "How do I move from design to implementation effectively?"
};

const ChatWindow = ({ messages, loading, sidebarVisible, toggleSidebar,selectedStage, changeStage }) => {
  const chatBoxRef = useRef(null);
  const stages = ['Design','Empathize', 'Define','Ideate', 'Prototype', 'Test', 'Implement'];

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStageClick = (stage) => {
    changeStage(stage)
    // setSelectedStage(stage);
    // const prompt = stagePrompts[stage];
    // if (prompt && !loading) {
    //   sendMessage(prompt); // Use the passed sendMessage prop
    // }
  };


  return (
    <div className="chat-window">
      {!sidebarVisible && (
        <button onClick={toggleSidebar} className="open-sidebar-btn">
          <ExpandIcon />
        </button>
      )}

      <div className="stage-buttons">
        {stages.map(stage => (
          <button
            key={stage}
            className={`stage-btn ${selectedStage === stage ? 'active' : ''}`}
            onClick={() => handleStageClick(stage)}
          >
            {getIconForStage(stage)} {stage}
          </button>
        ))}
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="message ai loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
