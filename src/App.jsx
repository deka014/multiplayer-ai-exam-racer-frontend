import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Race from './pages/Race';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby/:raceId" element={<Lobby />} />
          <Route path="/race/:raceId" element={<Race />} />
          <Route path="/results/:raceId" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
