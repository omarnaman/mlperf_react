import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Config from './pages/config/Config';
import Results from "./pages/results/Results"

const App = () => {
  return (
    <Router>
      {/* anything here (outside the "ROUTES" tag) will show up on all pages */}
      <Routes>
        <Route path="/" element={<Config />}></Route>
        <Route path="/Results" element={<Results />}></Route>
      </Routes>
    </Router>
  )
};

export default App;
