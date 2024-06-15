import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Quiz from './components/Quiz/Quiz.jsx';
import Start from './components/Start/Start.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import './App.css'

const App = () => {
  return (
  <>
    < Navbar />
    <Router>
      <div className="App">
        <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<Start />} />
        </Routes>
      </div>
    </Router>
  </>
  );
};

export default App;