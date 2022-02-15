import React from 'react';
import "./resultsLeft.css"
import { Title, TestStorage } from '../../components';

const ResultsLeft = () => {
  return (
  <div className='leftContain'>
    <Title name="Table Display"/>
    <TestStorage />
  </div>
  )
};

export default ResultsLeft;
