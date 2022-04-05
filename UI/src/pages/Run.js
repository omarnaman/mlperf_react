import React, { useContext } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Button } from '@windmill/react-ui' 
import { Card, CardBody } from '@windmill/react-ui'
import { createJobYAML } from "../utils/yaml_builder"
import { ConfigContext } from '../context/ConfigContext';
import { Input, Label } from '@windmill/react-ui'


function Run() {
  const [config, setConfig] = useContext(ConfigContext)
  var eid = ""

  function HandleChange(e) {
    const value = e.target.value;
    eid = value;
  }


  async function handleStart(){

    var clientsRange = config["--threads"]
    if (!clientsRange) {
      clientsRange = "1-1"
    }
    var time = config["--time"]
    var count = config["--count"]
    var scenario = config["--scenario"]
    var spq = config["--samples-per-query"]
    console.log(time, count, scenario)
    console.log(config)
    var args = []
    if (time) {
      args = args.concat(["--time", `${time}`])
    }
    if (spq) {
      args = args.concat(["--samples-per-query", `${spq}`])
    } else {
      args = args.concat(["--samples-per-query", "1"])
    }
    if (count) {
      args = args.concat(["--count", `${count}`])
    } else {
      args = args.concat(["--count", "10"])
    }
    if (scenario) {
      args = args.concat(["--scenario", `${scenario}`])
    } else {
      args = args.concat(["--scenario", "Offline"])
    }
    const clientsMinMax = clientsRange.split("-")
    const clientMin = parseInt(clientsMinMax[0])
    const clientMax = parseInt(clientsMinMax[1])
    
    
    // const v1 = Object.keys(config);
    // const v2 = Object.values(config);
    // var configArgs = [];
    // for (var idx = 0; idx < 4; idx++){
      //   configArgs.push(v1[idx]);
    //   configArgs.push(v2[idx]);
    // }
    // if (configArgs[0] ==undefined){
    //   console.log("invalid config, default used")
    //   configArgs = ["--scenario", "Offline", "--time", "10", "--threads", "4", "--count", "400"];
    // }
    // console.log(configArgs);
    var running = false
    console.log(clientMin, clientMax)
    for (let index = clientMin; index <= clientMax; index++) {
      var loops = 0;
      while(running){
        await new Promise(resolve => setTimeout(resolve, 1000))
        loops += 1
        if (loops > 100000) {
          return
        }
      }
      running = true
      const testSelector = `${index}`;
      const configArgs = args.concat(["--threads", testSelector])
      document.getElementById("statusImg").src = "https://www.freeiconspng.com/thumbs/load-icon-png/load-icon-png-8.png"
      document.getElementById("statusTxt").innerHTML = `Experiment ID: ${eid}, job with: ${testSelector} clients is running`
      const k8sServiceStartJob = "http://3.133.91.254:8001/_kdaHgMW_N-6-hC5RIdO/apis/batch/v1/namespaces/default/jobs"
      const k8sServiceJobStatus = "http://3.133.91.254:8001/_kdaHgMW_N-6-hC5RIdO/apis/batch/v1/namespaces/default/jobs/" + testSelector
      console.log(`Starting (${testSelector} clients)`)
      // const Requestbody = createJobYAML(eid, testSelector, configArgs);
      // console.log(Requestbody)
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
            console.log(`job (${testSelector} clients) still active`);
          } else {
            console.log(`job (${testSelector} clients) finished`);
            document.getElementById("statusTxt").innerHTML = "No experiment is running"
            document.getElementById("statusImg").src = "https://cdn-icons-png.flaticon.com/512/16/16427.png"
            running = false
            clearInterval(JobCheckInterval);
          }
        })
      }, 1000)
    }
  }
  
  

  return (
    <>
      <PageTitle>Run Experiment</PageTitle>

        <Card>
          <CardBody>
            <Label className="mt-4">
              <span>Experiment ID</span>
              <Input id="eid" className="mt-1" placeholder="The experiment's ID" onChange={HandleChange} />
            </Label>
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
