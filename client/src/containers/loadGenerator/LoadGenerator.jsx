import React from 'react';
import "./loadGenerator.css";
import { Title, Parameter, ImportButton } from '../../components';

const LoadGenerator = () => {
  return (
  <div className='genConfig'>
    <Title name="Load Generatator Configuration"/>
    <ImportButton />
  </div>
  )
};

export default LoadGenerator;
