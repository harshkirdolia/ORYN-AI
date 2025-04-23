import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import router
import './index.css';
import App from './Home.jsx';
import Studio from './Studio.jsx'; // Import Studio component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Wrap the entire app in Router */}
      <Routes>
        <Route path="/" element={<App />} /> {/* Home page route */}
        <Route path="/studio" element={<Studio />} /> {/* Studio page route */}
      </Routes>
    </Router>
  </StrictMode>
);