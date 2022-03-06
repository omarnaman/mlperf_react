import React from 'react';
import "./systemTest.css";
import { Title, Parameter, Button } from '../../../components';

const SystemTest = () => {
  return (
  <div className='systemConfig'>
    <Title name="System Under Test Configuration"/>
    <div className='paramContain'>
      <div className='paramTogether'>
        <Parameter title="Model Threads" num=""/>
        <input placeholder=" num" className="numBox" type="text"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Model" num=""/>
        <select className='dropdown'>
          <option>ssd-mobilenet</option>
          <option>USPP</option>
        </select>
      </div>
      <div className='paramTogether'>
        <Parameter title="Runtime" num=""/>
        <select className='dropdown'>
          <option>tflite</option>
          <option>tensorflow</option>
          <option>pytorch</option>
          <option>pytorch-native</option>
          <option>unnxruntime</option>
        </select>
      </div>
      <div className='paramTogether'>
        <Parameter title="Consumer Threads" num=""/>
        <input placeholder=" num" className="numBox" type="text"></input>
      </div>

    </div>
    <Button text="Import Configuration From Disk"/>
  </div>
  )
};

export default SystemTest;
