import React from 'react';
import "./config.css"
//import { Parameter, StartButton, Title, ImportButton } from '../../components';
import { Loadgen, StartTab, Model, ConfigTabBar } from '../../containers';

const Config = () => {
  return (
  <div className="config">
    <ConfigTabBar/>
    {/* <p className='fillconfig'></p>
    <StartTab /> */}
  </div>
  )
};

export default Config;
