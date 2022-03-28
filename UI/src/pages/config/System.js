import React from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Select, Button } from '@windmill/react-ui'

function System() {
  return (
    <>
      <PageTitle>System Under Test Configuration</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <Label className="mt-4">
          <span>Model Threads</span>
          <Input className="mt-1" placeholder="num" />
        </Label>

        <Label className="mt-4">
          <span>Model</span>
          <Select className="mt-1">
            <option>ssd-mobilnet</option>
            <option>USPP</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Runtime</span>
          <Select className="mt-1">
            <option>tflite</option>
            <option>tensorflow</option>
            <option>pytorch</option>
            <option>pytorch-native</option>
            <option>unnxruntime</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Consumer Threads</span>
          <Input className="mt-1" placeholder="num" />
        </Label>

        <div className="mt-4">
          <Button size="large">Import Configuration from Disk</Button>
        </div>
      </div>
    </>
  )
}

export default System
