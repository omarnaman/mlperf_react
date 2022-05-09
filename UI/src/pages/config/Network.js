import React, { Component, useState, useContext } from 'react'
import { ConfigContext } from '../../context/ConfigContext';

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Button, HelperText } from '@windmill/react-ui'

function Network() {
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
    const ids = ["tcClient", "tcClientDelay", "tcClientBW", "tcClientDrop", "tcServer", "tcServerDelay", "tcServerBW", "tcServerDrop"];
    ids.forEach(id => {
      setConfig(prevConfig => ({...prevConfig, [document.getElementById(id).name]:document.getElementById(id).value}))
    })
    console.log(config);
    // Save to global state
  }

  return (
    <>
      <PageTitle>Network Emulation Configuration</PageTitle>
      <form onSubmit={save}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

          <Label check>
            <Input id="tcClient" type="checkbox" name="--tc" onChange={updateConfig} />
            <span className="ml-2">Enable Client-side Traffic Emulation</span>
          </Label>


          <Label className="mt-4">
            <span>tc-delay</span>
            <Input id="tcClientDelay" className="mt-1" type="text" name="--tc_delay" onChange={updateConfig} />
            <HelperText>Emulated network delay from the client side (10ms, 1s, ...) </HelperText>
          </Label>

          <Label className="mt-4">
            <span>tc-jitter</span>
            <Input id="tcClientJitter" className="mt-1" type="text" name="--tc_jitter" onChange={updateConfig} />
            <HelperText>Emulated network jitter from the client side (10ms, 1s, ...)  </HelperText>
          </Label>

          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input id="tcClientBW" className="mt-1" type="text" name="--tc_bandwidth" onChange={updateConfig} />
            <HelperText>Emulated network bandwidth from the client side (10kbps, 1mbps, ...)</HelperText>
          </Label>

          <Label className="mt-4">
            <span>tc_random_loss</span>
            <Input id="tcClientDrop" className="mt-1" type="text" name="tcClientDrop" onChange={updateConfig} />
            <HelperText>Emulated network random drop probability on the client side</HelperText>
          </Label>


        </div>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

          <Label check>
            <Input id="tcServer" type="checkbox" name="tcServer" onChange={updateConfig} />
            <span className="ml-2">Enable Server-side Traffic Emulation</span>
          </Label>

          <Label className="mt-4">
            <span>tc-delay</span>
            <Input id="tcServerDelay" className="mt-1" type="text" name="tcServerDelay" onChange={updateConfig} />
            <HelperText>Emulated network delay from the server side (10ms, 1s, ...)</HelperText>
          </Label>

          <Label className="mt-4">
            <span>tc-jitter</span>
            <Input id="tcServerJitter" className="mt-1" type="text" name="--tc_jitter" onChange={updateConfig} />
            <HelperText>Emulated network jitter from the server side (10ms, 1s, ...)  </HelperText>
          </Label>

          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input id="tcServerBW" className="mt-1" type="text" name="tcServerBW" onChange={updateConfig} />
            <HelperText>Emulated network bandwidth from the server side (10kbps, 1mbps, ...)</HelperText>
          </Label>

          <Label className="mt-4">
            <span>tc_random_loss</span>
            <Input id="tcServerDrop" className="mt-1" type="text" name="tcServerDrop" onChange={updateConfig} />
            <HelperText>Emulated network random drop probability on the server side</HelperText>
          </Label>

        </div>
        <div className="mt-4">
          <Button size="large">Import Configuration from Desk</Button>
        </div>

        {/* <div className="mt-4">
            <Input type="submit" value="Save Config" />
        </div> */}
      </form>
    </>
  )
}

export default Network
