import React from 'react'

import { useState } from "react";
import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Button } from '@windmill/react-ui'

function Network() {

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
      <PageTitle>Network Emulation Configuration</PageTitle>
      <form onSubmit={save}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

          <Label className="mt-4" check>
            <Input type="checkbox" name="tc" onChange={HandleChange} />
            <span className="ml-2">Enable Client-side Traffic Emulation</span>
          </Label>


          <Label className="mt-4">
            <span>tc-delay</span>
            <Input className="mt-1" placeholder="Emulated network delay from the client side (10ms, 1s, ...)" type="text" name="tcClientDelay" onChange={HandleChange} />
          </Label>

          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input className="mt-1" placeholder="Emulated network bandwidth from the client side (10kbps, 1mbps, ...)" type="text" name="tcClientBW" onChange={HandleChange} />
          </Label>
          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input className="mt-1" placeholder="Emulated network random drop probability on the client side" type="text" name="tcClientDrop" onChange={HandleChange} />
          </Label>


        </div>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

          <Label className="mt-4" check>
            <Input type="checkbox" name="tc" onChange={HandleChange} />
            <span className="ml-2">Enable Server-side Traffic Emulation</span>
          </Label>

          <Label className="mt-4">
            <span>tc-delay</span>
            <Input className="mt-1" placeholder="Emulated network delay from the server side (10ms, 1s, ...)" type="text" name="tcServerDelay" onChange={HandleChange} />
          </Label>

          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input className="mt-1" placeholder="Emulated network bandwidth from the server side (10kbps, 1mbps, ...)" type="text" name="tcServerBW" onChange={HandleChange} />
          </Label>

          <Label className="mt-4">
            <span>tc-bandwidth</span>
            <Input className="mt-1" placeholder="Emulated network random drop probability on the server side" type="text" name="tcClientDrop" onChange={HandleChange} />
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
