import React from 'react';
import './ChatInput.css';

const ChatInput = ({ input, setInput, loading, sendMessage }) => {
  return (
    <div className="chat-input-wrapper">
      <div className="card-row">
        {/* Chat Card */}
        <div className="chat-card">
          <div className="input-row">
            <input
              type="text"
              placeholder="Let’s Design Something Beautiful..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button className="send-button" onClick={sendMessage} disabled={loading}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>

          <div className="tags-row">
            <button>Product Services</button>
            <button>Popularity</button>
            <button>Raise &gt; 500m</button>
            <button>Random Conversation</button>
            <button>Client Fundraising Count</button>
          </div>
        </div>

        {/* Clipboard Card */}
        <div className="clipboard-card">
          <h4>Clipboard</h4>
          <p className="clipboard-placeholder">Your saved messages, prompts, or copied insights will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;