import React from 'react';
import "./loadgen.css";
import { Title, Parameter } from '../../components';

const Loadgen = () => {
  return (
  <div className='loadgenContain'>
    <Title name="Loadgen Configuration"/>
    <div className='paramContain'>
      <div className='paramTogether'>
        <Parameter title="Clients" num=""/>
        <input className="numBox" type="text"></input>
      </div>
    </div>
    <p className='fillSpace2'>list more parameters as needed</p>
  </div>
  )
};

export default Loadgen;
