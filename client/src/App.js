import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Config from './pages/config/Config';
import Results from "./pages/results/Results"

const App = () => {
  return (
    <Router>
      <div className='header'>
        <p>Model Version: </p>
        <p>Tool Name: </p>
        <p>Tool Version: </p>
      </div>
      <div className='main'>
        <div className='pageBar'>
          <p className='pageTab'>Configuration</p>
          <p className='pageTab'>Results</p>
          <p className='pageTab'>Settings</p>
        </div>
        <div className='display'>
          <Routes>
            <Route path="/" element={<Config />}></Route>
            <Route path="/Results" element={<Results />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
};

export default App;
