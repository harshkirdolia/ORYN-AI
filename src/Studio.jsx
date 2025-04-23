import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import "./Studio.css";
import "./components/CustomCursor.css";

const Studio = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedStage, setSelectedStage] = useState('Design');

  const cursorRef = useRef(null);
  const requestRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
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
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: messageText }]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('https://generatetext-utyyfw5yya-uc.a.run.app/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: messageText }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.text }]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Something went wrong. Try again!' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => sendMessage(input);

  const changeStage = (stageName) => setSelectedStage(stageName);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <div className="studio">
      <div ref={cursorRef} className="custom-cursor" />
      <Topbar />
      <div className="studio-layout">
        <Sidebar isVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
        <div className="studio-content">
          <ChatWindow
            messages={messages}
            loading={loading}
            sidebarVisible={sidebarVisible}
            toggleSidebar={toggleSidebar}
            selectedStage={selectedStage}
            changeStage={changeStage}
          />
          <ChatInput
            input={input}
            setInput={setInput}
            loading={loading}
            sendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Studio;