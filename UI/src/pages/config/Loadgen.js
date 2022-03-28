import React from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Select, Button } from '@windmill/react-ui'

function Loadgen() {
  return (
    <>
      <PageTitle>Load Generator Configuration</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label className="mt-4">
          <span>Data Set</span>
          <Select className="mt-1">
            <option>Imagenet2012</option>
            <option>Coco</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Scenario</span>
          <Select className="mt-1">
            <option>SingleStream</option>
            <option>MultiStream</option>
            <option>Offline</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Count</span>
          <Input className="mt-1" placeholder="num" />
        </Label>

        <Label className="mt-4">
          <span>Threads</span>
          <Input className="mt-1" placeholder="num" />
        </Label>

        <Label className="mt-4">
          <span>Max Batchsize</span>
          <Input className="mt-1" placeholder="num" />
        </Label>

        <Label className="mt-4" check>
          <Input type="checkbox" />
          <span className="ml-2">Record Accuracy</span>
        </Label>

        <Label className="mt-4">
          <span>Time</span>
          <Input className="mt-1" placeholder="num" />
        </Label>

        <Label className="mt-4" check>
          <Input type="checkbox" />
          <span className="ml-2">pl</span>
        </Label>

        <Label className="mt-4">
          <span>Samples Per Query</span>
          <Input className="mt-1" placeholder="num" />
        </Label>

        <Label className="mt-4" check>
          <Input type="checkbox" />
          <span className="ml-2">Max Outgoing</span>
        </Label>

        <div className="mt-4">
          <Button size="large">Import Configuration from Disk</Button>
        </div>

      </div>
    </>
  )
}

export default Loadgen
