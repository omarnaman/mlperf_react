import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Button } from '@windmill/react-ui' 
import { Card, CardBody } from '@windmill/react-ui'

function Run() {
  
  async function handleStart(){
    const address = "http://3.133.91.254:8001/_kdaHgMW_N-6-hC5RIdO/";
    const address2 = "http://3.133.91.254:8087/latencies/testing";
    fetch(address2)
      .then(res => res.json)
      .then(data => {
        console.log(data)
        console.log(address2)
      })
  }

  return (
    <>
      <PageTitle>Run Experiment</PageTitle>

        <Card>
          <CardBody>
            <SectionTitle>No Experiment is Running</SectionTitle>

            <div className='mt-10'>
              <img src="https://cdn-icons-png.flaticon.com/512/16/16427.png" className='object-cover h-48 w-96'></img>
            </div>

            <div className='mt-10'>
              <Button onClick={handleStart} size="larger">Begin Experiment</Button>
            </div>
          </CardBody>
        </Card>
        
    </>
  )
}

export default Run
