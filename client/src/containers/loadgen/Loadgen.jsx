import React from 'react';
import "./loadgen.css";
import { Title, Parameter, ImportButton } from '../../components';

const Loadgen = () => {
  return (
  <div className='loadgenContain'>
    <Title name="Loadgen Configuration"/>
    <div className='paramContain'>
      <div className='paramTogether'>
        <Parameter title="Clients" num=""/>
        <input placeholder=" num" className="numBox" type="text"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Network Communication" num=""/>
        <select className='dropdown'>
          <option>TCP</option>
          <option>HTTP</option>
        </select>
      </div>
      <div className='paramTogether'>
        <Parameter title="Duration" num=""/>
        <input placeholder=" num" className="numBox" type="text"></input>
      </div>
            <div className='paramTogether'>
        <Parameter title="Accuracy" num=""/>
        <input placeholder=" num" className="numBox" type="text"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Timeout Duration" num=""/>
        <input placeholder=" num" className="numBox" type="text"></input>
      </div>
    </div>
    <p className='fillSpace2'>list more parameters as needed</p>
    <ImportButton />
  </div>
  )
};

export default Loadgen;
