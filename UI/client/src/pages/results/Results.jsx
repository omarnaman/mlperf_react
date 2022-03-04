import React from 'react';
import "./results.css";
import { ResultsLeft, ResultsRight } from '../../containers';

const Results = () => {
  return (
  <div className="page">
    <ResultsLeft/>
    <ResultsRight/>
  </div>
  )
};

export default Results;
