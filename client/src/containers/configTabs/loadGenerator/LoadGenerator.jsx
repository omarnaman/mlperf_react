import React from 'react';
import "./loadGenerator.css";
import { Title, Parameter, ImportButton } from '../../../components';

const LoadGenerator = () => {
  return (
  <div className='genConfig'>
    <Title name="Load Generator Configuration"/>
    <div className='paramContain'>
      <div className='paramTogether'>
        <Parameter title="DataSet" num=""/>
        <select className='dropdown'>
          <option>coco</option>
          <option>imagenet2012</option>
        </select>
      </div>
      <div className='paramTogether'>
        <Parameter title="Scenario" num=""/>
        <select className='dropdown'>
          <option>singleStream</option>
          <option>multiStream</option>
          <option>offline</option>
        </select>
      </div>
      <div className='paramTogether'>
        <Parameter title="Count" num=""/>
        <input placeholder=" num" className="numBox" type="text"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Threads" num=""/>
        <input placeholder=" num" className="numBox" type="text"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Max Batchsize" num=""/>
        <input placeholder=" num" className="numBox" type="text"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Record Accuracy" num=""/>
        <input defaultChecked className="checkBox" type="checkbox"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Time" num=""/>
        <input placeholder=" text"className="TextBox" type="text"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Samples Per Query" num=""/>
        <input placeholder=" text"className="TextBox" type="text"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Pipeline" num=""/>
        <input defaultChecked className="checkBox" type="checkbox"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Max Outgoing" num=""/>
        <input defaultChecked className="checkBox" type="checkbox"></input>
      </div>
    </div>
    <ImportButton />
  </div>
  )
};

export default LoadGenerator;
