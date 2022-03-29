import React, { Component, useState, useContext } from 'react'
import { ConfigContext } from '../../context/ConfigContext';

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Select, Button } from '@windmill/react-ui'

function Cloud() {
  const [config, setConfig] = useContext(ConfigContext)

  const updateConfig = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setConfig(prevConfig => ({...prevConfig, [name]:value }))
    console.log(config);
  }

  function save(target) {
    target.preventDefault();
    // Save to global state
  }

  return (
    <>
      <PageTitle>Cloud Deployment Configuration (WIP)</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <form onSubmit={save}>
        
          <Label className="mt-4" check>
            <Input type="checkbox" name="cloudDeployment" onChange={updateConfig}/>
            <span className="ml-2">Enable Cloud Deployment</span>
          </Label>

          <Label className="mt-4">
            <span>Cloud Provider</span>
            <Select className="mt-1" name="cloudProvider" onChange={updateConfig}>
              <option>AWS</option>
              <option>Google Cloud</option>
              <option>MS Azure</option>
            </Select>
          </Label>

          <div className="mt-4">
            <Button size="large">Import Configuration from Disk</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cloud
