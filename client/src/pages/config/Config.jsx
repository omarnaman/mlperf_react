import React from 'react';
import "./config.css"
//import { Parameter, StartButton, Title, ImportButton } from '../../components';
import { Loadgen, StartTab, Model } from '../../containers';

const Config = () => {
  return (
  <div className="config">
    <Model />
    <Loadgen />
    <StartTab />
  </div>
  )
};

export default Config;
