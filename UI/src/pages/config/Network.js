import React from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Button } from '@windmill/react-ui'

function Network() {
  return (
    <>
      <PageTitle>Network Emulation Configuration</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <Label className="mt-4" check>
          <Input type="checkbox" />
          <span className="ml-2">tc</span>
        </Label>

        <Label className="mt-4">
          <span>tc-delay</span>
          <Input className="mt-1" placeholder="num (unit)" />
        </Label>

        <Label className="mt-4">
          <span>tc-bandwidth</span>
          <Input className="mt-1" placeholder="num (unit)" />
        </Label>

        <div className="mt-4">
          <Button size="large">Import Configuration from Disk</Button>
        </div>

      </div>
    </>
  )
}

export default Network
