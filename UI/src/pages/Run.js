import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Button } from '@windmill/react-ui' 
import { Card, CardBody } from '@windmill/react-ui'
const fs = require('fs');


function Run() {

  async function handleStart(){

    document.getElementById("statusImg").src = "https://www.freeiconspng.com/thumbs/load-icon-png/load-icon-png-8.png"
    document.getElementById("statusTxt").innerHTML = "experiment is running"
    

    const k8sService = "http://3.133.91.254:8001/_kdaHgMW_N-6-hC5RIdO/";
    const storageLatencies = "http://3.133.91.254:8087/latencies/testing";
    const storageQps = "http://3.133.91.254:8087/qps/testing";
    const k8sServiceStartJob = "http://3.133.91.254:8001/_kdaHgMW_N-6-hC5RIdO/apis/batch/v1/namespaces/default/jobs"
    const k8sServiceJobStatus = "http://3.133.91.254:8001/_kdaHgMW_N-6-hC5RIdO/apis/batch/v1/namespaces/default/jobs/client7"

    //http request to k8s service
    // fetch(k8sService)
    //   .then(res => res.json())
    //   .then(data => console.log(data.paths))

    // http request to storage service latencies endpoint
    // retrieves an array of objects, with experiment id, the latencies as one long string of numbers seperated by commas, and the selector
    // fetch(storageLatencies)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     console.log(data.length)
    //     console.log(data[0])
    //     console.log(data[0].latencies)})

    //http request to storage service qps endpoint
    //retrieves an array of objects, with experiment id, the qps as a num or float, and the selector
    // fetch(storageQps)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     console.log(data.length)
    //     console.log(data[0])
    //     console.log(data[0].qps)})

    //http request to check a jobs status, will work if name is correct and job is currently running
    // fetch(k8sServiceJobStatus)
    //   .then(res => res.json())
    //   .then(data => console.log(data))

    //http request to start a job
    // const bodyData = ""

    // const response = await fetch(k8sServiceStartJob, {
    //   method: 'POST',
    //   mode: 'cors', //dunno if need
    //   headers: {
    //     'Content-Type': 'application/yaml'
    //   },
    //   body: JSON.stringify(bodyData)
    // });
    // console.log(response.json())

  }

  return (
    <>
      <PageTitle>Run Experiment</PageTitle>

        <Card>
          <CardBody>
            <SectionTitle id="statusText">Experiment Status:</SectionTitle>
            <p id="statusTxt" className="text-white font-bold">No experiment is running</p>

            <div className='mt-10'>
              <img id="statusImg" src="https://cdn-icons-png.flaticon.com/512/16/16427.png" className='object-cover h-48 w-96'></img>
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