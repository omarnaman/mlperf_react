import React, { Component, useState, useContext } from 'react'
import { ConfigContext } from '../../context/ConfigContext';

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Select, Button, HelperText } from '@windmill/react-ui'


function Loadgen() {
  const {eidContext, configContext} = useContext(ConfigContext);
  const [eid,setEid] = eidContext;
  const [config,setConfig] = configContext;
  // const [inputs, setInputs] = useState({});

  // function HandleChange(e) {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setInputs(values => ({ ...values, [name]: value }))
  //   console.log(inputs);
  // }

  const updateConfig = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setConfig(prevConfig => ({...prevConfig, [name]:value }))
    console.log(config);
  }

  //saving all configuration at once
  function save(target) {
    target.preventDefault();
    const ids = ["dataset", "scenario", "sampleCount", "threadCountRange", "accuracy", "time", "pipeline", "samplesPerQuery", "maxOutgoing"];
    ids.forEach(id => {
      setConfig(prevConfig => ({...prevConfig, [document.getElementById(id).name]:document.getElementById(id).value}))
    })
    console.log(config);
    // Save to global state
  }

  return (
    <>
      <PageTitle>Load Generator Configuration</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={save}>

          <Label className="mt-4">
            <span>Data Set</span>
            <Select id="dataset" className="mt-1" name="--dataset" onChange={updateConfig}>
              <option>Imagenet2012</option>
              <option>Coco</option>
            </Select>
          </Label>

          <Label className="mt-4">
            <span>Scenario</span>
            <Select id="scenario" className="mt-1" name="--scenario" onChange={updateConfig}>
              <option>Offline</option>
              <option>SingleStream</option>
              <option>MultiStream</option>
            </Select>
          </Label>

          <Label className="mt-4">
            <span>Sample Count</span>
            <Input id="sampleCount" className="mt-1" value={config["--count"]} type="number" name="--count" onChange={updateConfig}/>
            <HelperText>The number of samples to be loaded from the dataset</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Range of Clients</span>
            <Input id="threadCountRange" className="mt-1" value={config["--threads"]} type="text" name="--threads" onChange={updateConfig} />
            <HelperText>The range of the number of clients to run concurrently (1-10, 3-6)</HelperText>
          </Label>

          <Label className="mt-4" check>
            <Input id="accuracy" type="checkbox" name="--accuracy" onChange={updateConfig} />
            <span className="ml-2">Record Accuracy</span>
          </Label>

          <Label className="mt-4" >
            <span>Time</span>
            <Input id="time" className="mt-1" value={config["--time"]} type="number" name="--time" onChange={updateConfig} />
            <HelperText>Experiment duration in seconds</HelperText>
          </Label>

          <Label className="mt-4" check>
            <Input id="pipeline" type="checkbox" name="--pl" onChange={updateConfig} />
            <span className="ml-2">Pipeline requests</span>
          </Label>

          <Label className="mt-4">
            <span>Samples Per Query</span>
            <Input id="samplesPerQuery" className="mt-1" value={config["--samples-per-query"]} type="number" name="--samples-per-query" onChange={updateConfig} />
            <HelperText>Samples to send per query</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Max Outgoing Queries</span>
            <Input id="maxOutgoing" className="mt-1" placeholder="Maximum outgoing queries in case of pipelining" type="number" name="--max_outgoing" onChange={updateConfig} />
          </Label>

          <div className="mt-4">
            <Button size="large">Import Configuration from Disk</Button>
          </div>
          <div className="mt-4">
            <Input type="submit" value="Save Config" />
          </div>

        </form>
      </div>
    </>
  )
}

export default Loadgen
