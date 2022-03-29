import React, { Component, useState, useContext } from 'react'
import { ConfigContext } from '../../context/ConfigContext';

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Button } from '@windmill/react-ui'

function Network() {
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
      <PageTitle>Network Emulation Configuration</PageTitle>
      <form onSubmit={save}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

          <Label className="mt-4" check>
            <Input type="checkbox" name="tc" onChange={updateConfig} />
            <span className="ml-2">Enable Client-side Traffic Emulation</span>
          </Label>


          <Label className="mt-4">
            <span>tc-delay</span>
            <Input className="mt-1" placeholder="Emulated network delay from the client side (10ms, 1s, ...)" type="text" name="tcClientDelay" onChange={updateConfig} />
          </Label>

          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input className="mt-1" placeholder="Emulated network bandwidth from the client side (10kbps, 1mbps, ...)" type="text" name="tcClientBW" onChange={updateConfig} />
          </Label>
          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input className="mt-1" placeholder="Emulated network random drop probability on the client side" type="text" name="tcClientDrop" onChange={updateConfig} />
          </Label>


        </div>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

          <Label className="mt-4" check>
            <Input type="checkbox" name="tc" onChange={updateConfig} />
            <span className="ml-2">Enable Server-side Traffic Emulation</span>
          </Label>

          <Label className="mt-4">
            <span>tc-delay</span>
            <Input className="mt-1" placeholder="Emulated network delay from the server side (10ms, 1s, ...)" type="text" name="tcServerDelay" onChange={updateConfig} />
          </Label>

          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input className="mt-1" placeholder="Emulated network bandwidth from the server side (10kbps, 1mbps, ...)" type="text" name="tcServerBW" onChange={updateConfig} />
          </Label>

          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input className="mt-1" placeholder="Emulated network random drop probability on the server side" type="text" name="tcClientDrop" onChange={updateConfig} />
          </Label>

        </div>
        <div className="mt-4">
          <Button size="large">Import Configuration from Disk</Button>
        </div>
      </form>
    </>
  )
}

export default Network
