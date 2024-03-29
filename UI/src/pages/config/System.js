import React, { Component, useState, useContext } from 'react'
import { ConfigContext } from '../../context/ConfigContext';

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Select, Button, HelperText } from '@windmill/react-ui'

function System() {
  const {eidContext, configContext} = useContext(ConfigContext);
  const [eid,setEid] = eidContext;
  const [config,setConfig] = configContext;

  const updateConfig = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setConfig(prevConfig => ({...prevConfig, [name]:value }))
    console.log(config);
  }

  function save(target) {
    target.preventDefault();
    const ids = ["modelThreads", "model", "runtime", "consumerThreads"];
    ids.forEach(id => {
      setConfig(prevConfig => ({...prevConfig, [document.getElementById(id).name]:document.getElementById(id).value}))
    })
    console.log(config);
    // Save to global state
  }

  return (
    <>
      <PageTitle>System Under Test Configuration</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={save}>

          <Label>
            <span>Model Threads</span>
            <Input id="modelThreads" className="mt-1" type="number" name="--model-threads" onChange={updateConfig} />
            <HelperText>Number of threads dedicated to each request on the server side</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Model</span>
            <Select id="model" className="mt-1" name="--model" onChange={updateConfig}>
              <option>ssd-mobilnet</option>
              <option>USPP</option>
            </Select>
            <HelperText>The model to load onto the runtime</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Runtime</span>
            <Select id="runtime" className="mt-1" name="--runtime" onChange={updateConfig}>
              <option>tflite</option>
              <option>tensorflow</option>
              <option>pytorch</option>
              <option>pytorch-native</option>
              <option>unnxruntime</option>
            </Select>
            <HelperText>The runtime to load the model</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Consumer Threads</span>
            <Input id="consumerThreads" className="mt-1" type="number" name="--consumer-threads" onChange={updateConfig} />
            <HelperText>The number of requests processed concurrently</HelperText>
          </Label>

          <div className="mt-4">
            <Button size="large">Import Configuration from Desk</Button>
          </div>
          {/* <div className="mt-4">
            <Input type="submit" value="Save Config" />
          </div> */}
        </form>
      </div>
    </>
  )
}

export default System
