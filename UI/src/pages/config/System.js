import React from 'react'

import { useState } from "react";
import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Select, Button } from '@windmill/react-ui'

function System() {

  const [inputs, setInputs] = useState({});

  function HandleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  function save(target) {
    target.preventDefault();
    // Save to global state
  }

  return (
    <>
      <PageTitle>System Under Test Configuration</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={save}>

          <Label className="mt-4">
            <span>Model Threads</span>
            <Input className="mt-1" placeholder="Number of threads dedicated to each request on the server side" type="num" name="modelThreads" onChange={HandleChange} />
          </Label>

          <Label className="mt-4">
            <span>Model</span>
            <Select className="mt-1" name="model" onChange={HandleChange}>
              <option>ssd-mobilnet</option>
              <option>USPP</option>
            </Select>
          </Label>

          <Label className="mt-4">
            <span>Runtime</span>
            <Select className="mt-1" name="runtime" onChange={HandleChange}>
              <option>tflite</option>
              <option>tensorflow</option>
              <option>pytorch</option>
              <option>pytorch-native</option>
              <option>unnxruntime</option>
            </Select>
          </Label>

          <Label className="mt-4">
            <span>Consumer Threads</span>
            <Input className="mt-1" placeholder="The number of requests processed concurrently" type="number" name="consumerThreads" onChange={HandleChange} />
          </Label>

          <div className="mt-4">
            <Button size="large">Import Configuration from Disk</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default System
