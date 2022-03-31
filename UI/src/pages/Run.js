import React, { useContext } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Button } from '@windmill/react-ui' 
import { Card, CardBody } from '@windmill/react-ui'
import { createJobYAML } from "../utils/yaml_builder"
import { ConfigContext } from '../context/ConfigContext';


function Run() {
  const [config, setConfig] = useContext(ConfigContext)
  
  async function handleStart(){

    var eid = "test2";
    var testSelector = "client1005"

    document.getElementById("statusImg").src = "https://www.freeiconspng.com/thumbs/load-icon-png/load-icon-png-8.png"
    document.getElementById("statusTxt").innerHTML = "Experiment ID: " + eid + "     Selector: " + testSelector +  "     is running"

    const k8sServiceStartJob = "http://3.133.91.254:8001/_kdaHgMW_N-6-hC5RIdO/apis/batch/v1/namespaces/default/jobs"
    const k8sServiceJobStatus = "http://3.133.91.254:8001/_kdaHgMW_N-6-hC5RIdO/apis/batch/v1/namespaces/default/jobs/" + testSelector

    const v1 = Object.keys(config);
    const v2 = Object.values(config);
    var configArgs = [];
    for (var idx = 0; idx < 4; idx++){
      configArgs.push(v1[idx]);
      configArgs.push(v2[idx]);
    }
    if (configArgs[0] ==undefined){
      console.log("invalid config, default used")
      configArgs = ["--scenario", "Offline", "--time", "10", "--threads", "4", "--count", "400"];
    }
    console.log(configArgs);

    fetch(k8sServiceStartJob, {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/yaml'
      },
      body: createJobYAML(eid, testSelector, configArgs)
    })
      .then(res => res.json())
      .then(data => console.log(data))

    var JobCheckInterval = setInterval(() => {
      fetch(k8sServiceJobStatus)
        .then(res => res.json())
        .then(data => {
          if (data.status.active){
            console.log("job still active");
          } else {
            console.log("job finished");
            document.getElementById("statusTxt").innerHTML = "No experiment is running"
            document.getElementById("statusImg").src = "https://cdn-icons-png.flaticon.com/512/16/16427.png"
            clearInterval(JobCheckInterval);
          }
        })
    }, 1000)
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
