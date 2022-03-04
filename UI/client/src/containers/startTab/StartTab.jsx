import React from 'react';
import "./startTab.css";
import { Title, StartButton } from '../../components';

const StartTab = () => {
  return (
  <div className='startTabContain'>
    <Title name="Experiment Status"/>
    <StartButton />
  </div>
  )
};

export default StartTab;
