import React from 'react';
import "./model.css";
import { Title, Parameter, ImportButton } from '../../components';

const Model = () => {
  return (
  <div className='modelContain'>
    <Title name="Model Configuration"/>
    <div className='paramContain'>
      <div className='paramTogether'>
        <Parameter title="Threads per Client" num=""/>
        <input placeholder=" 1" className="numBox" type="text"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Model" num=""/>
        <select className='dropdown'>
          <option>PyTorch</option>
          <option>TensorFlow</option>
          <option>ONNX</option>
        </select>
      </div>
      <div className='paramTogether'>
        <Parameter title="Dataset" num=""/>
        <select className='dropdown'>
          <option>Images</option>
          <option>Text</option>
        </select>
      </div>
      <div className='paramTogether'>
        <Parameter title="Model" num=""/>
        <select className='dropdown'>
          <option>NLP</option>
          <option>Image Processing</option>
        </select>
      </div>
      <div className='paramTogether'>
        <Parameter title="Backend Type" num=""/>
        <select className='dropdown'>
          <option>Filler</option>
          <option>Filler2</option>
        </select>
      </div>
      <div className='paramTogether'>
        <Parameter title="Parameter" num=" 1"/>
        <input defaultChecked className="checkBox" type="checkbox"></input>
      </div>
      <div className='paramTogether'>
        <Parameter title="Parameter" num=" 2"/>
        <input placeholder=" filler"className="TextBox" type="text"></input>
      </div>
    </div>
    <p className='fillSpace3'>list more parameters as needed</p>
    <ImportButton />
  </div>
  )
};

export default Model;
