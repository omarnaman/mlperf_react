import React from 'react';
import "./startTab.css";
import { Title, StartButton } from '../../components';

const StartTab = () => {
  return (
  <div className='startTabContain'>
    <Title name="Experiment Status"/>
    <p id="test" className='fillSpace'>finalize layout of this tab</p>
    <StartButton />
  </div>
  )
};

export default StartTab;
