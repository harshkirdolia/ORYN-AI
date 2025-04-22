import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './assets/logo.svg';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const cursorRef = useRef(null); 
  const requestRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://generatetext-utyyfw5yya-uc.a.run.app/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.text }]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Something went wrong. Try again!' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!cursorRef.current) {
      console.warn("Cursor ref is not assigned to a DOM element.");
    }

    const updateCursor = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleClick = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('click');
        setTimeout(() => {
          cursorRef.current?.classList.remove('click');
        }, 300);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    if (cursorRef.current) {
        requestRef.current = requestAnimationFrame(updateCursor);
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className="container">
      <div ref={cursorRef} className="custom-cursor"></div> 

      <div className='logo-container'>
        <img src={logo} className="logo" alt="logo" />
      </div>

      <div className="card">
        <div className="chatBox" ref={chatBoxRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="message ai loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          )}
        </div>

        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask me anything about design..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>
            <svg width="18" height="18">
              <circle cx="9" cy="9" r="8" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to our Design Studio</h1>
      <p>Get ready to unleash your creativity!</p>

      <div className="button-container">
        <Link to="/studio" className="dashboard-button">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default App;