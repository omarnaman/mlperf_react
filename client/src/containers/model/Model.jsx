import React from 'react';
import "./model.css";
import { Title, Parameter } from '../../components';

const Model = () => {
  return (
  <div className='modelContain'>
    <Title name="Model Configuration"/>
    <div className='paramContain'>
      <div className='paramTogether'>
        <Parameter title="Parameter" num="1"/>
        <input defaultChecked className="checkBox" type="checkbox"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Parameter" num="2"/>
        <input className="TextBox" type="text"></input>
      </div>
    </div>
    <p className='fillSpace3'>list more parameters as needed</p>
  </div>
  )
};

export default Model;
