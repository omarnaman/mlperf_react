import React from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Select, Button } from '@windmill/react-ui'

function Cloud() {
  return (
    <>
      <PageTitle>Cloud Deployment Configuration (WIP)</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <Label className="mt-4" check>
          <Input type="checkbox" />
          <span className="ml-2">Enable Cloud Deployment</span>
        </Label>

        <Label className="mt-4">
          <span>Cloud Provider</span>
          <Select className="mt-1">
            <option>AWS</option>
            <option>Google Cloud</option>
            <option>MS Azure</option>
          </Select>
        </Label>

        <div className="mt-4">
          <Button size="large">Import Configuration from Disk</Button>
        </div>
      </div>
    </>
  )
}

export default Cloud
