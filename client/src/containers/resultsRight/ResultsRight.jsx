import React from 'react';
import "./resultsRight.css"
import { Title, TestGraph } from '../../components';

const ResultsRight = () => {
  return (
  <div className='rightContain'>
    <Title name="Graph Display"/>
    <TestGraph />
  </div>
  )
};

export default ResultsRight;
