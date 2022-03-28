import React from 'react';
import { useNavigate } from "react-router-dom";
import './pageBar.css';

function PageBar() {
  let navigate = useNavigate();

  let handleConfigTab = () => {
    navigate("");
  }

  let handleResultsTab = () => {
    navigate("/results");
  }

  return (
    <div className='pageBar'>
      <p onClick={handleConfigTab} className='pageTab'>Configuration</p>
      <p onClick={handleResultsTab} className='pageTab2'>Results</p>
      <p className='pageTab3'>Settings</p>
    </div>
  )
}

export default PageBar;
