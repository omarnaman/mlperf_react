import React from 'react';
import { useNavigate } from "react-router-dom";
import './pageBar.css';

function PageBar() {
  let navigate = useNavigate();

  let handleResultsTab = () => {
    navigate("/results");
  }

  return (
    <div className='pageBar'>
      <p className='pageTab'>Configuration</p>
      <p onClick={handleResultsTab} className='pageTab2'>Results</p>
      <p className='pageTab3'>Settings</p>
    </div>
  )
}

export default PageBar;
