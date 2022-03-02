import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageBar } from './components';
import Config from './pages/config/Config';
import Results from "./pages/results/Results"

function App(){
  return (
    <Router>
      <div className='header'>
        <p>Model Version: </p>
        <p>Tool Name: </p>
        <p>Tool Version: </p>
      </div>
      <div className='main'>
        <PageBar />
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
