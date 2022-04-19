import React, { useContext, useEffect, useState } from 'react'
import configData from '../server_config'

import { ConfigContext } from '../context/ConfigContext';
import { Input, Label, Select, Button, HelperText } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { Line } from 'react-chartjs-2'

function Results() {
  const {eidContext, configContext} = useContext(ConfigContext);
  const [eid,setEid] = eidContext;
  const [config,setConfig] = configContext;

  var eid1 = ""
  function HandleEidChange(e) {
    const value = e.target.value;
    console.log(value)
    eid1 = value;
  }

  const SERVER_IP = configData["SERVER_IP"]
  const [qpsChartData, setQpsChartData] = useState({})
  const [latChartData, setLatChartData] = useState({})

  const popSelect = () => {
  const storageEids = `http://${SERVER_IP}:8087/experiments`;
  fetch(storageEids)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      var eidSelect = document.getElementById("eidSelect")
      data.experiments.forEach(element => {
        eidSelect.options.add( new Option(element,element))
      })
    })
  }

  popSelect()

  const qpsChart = () => {
    const storageQps = `http://${SERVER_IP}:8087/qps/${eid1}`;
    var qpsSelectors = [];
    var qpsData = [];
    fetch(storageQps)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach(element => {
          qpsSelectors.push(element.selector)
          qpsData.push(element.qps)
        })
        console.log(qpsSelectors)
        console.log(qpsData);

        setQpsChartData({
          labels: qpsSelectors,
          datasets: [
            {
              label: "Queries Per Second",
              data: qpsData,
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)"
            }
          ]
        })
      })
  }

  const latChart = () => {
    console.log(eid1)
    const storageLatencies = `http://${SERVER_IP}:8087/latencies/${eid1}`;
    var lat10 = [];
    var lat50 = [];
    var lat90 = [];
    var latencySelectors = [];
    fetch(storageLatencies)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach(element => {
          latencySelectors.push(element.selector);
          var latencyData = element.latencies.split(",")
          const length = latencyData.length
          latencyData.sort(function (a,b) {
            return parseFloat(a) - parseFloat(b)
          })
          lat10.push(latencyData[parseInt(length * .10)])
          lat50.push(latencyData[parseInt(length * .50)])
          lat90.push(latencyData[parseInt(length * .90)])
        })

        setLatChartData({
          labels: latencySelectors,
          datasets: [
            {
              label: "10th Percentile",
              data: lat10,
              fill: false,
              borderColor: "rgba(247,134,134,0.7)"
            }, 
            {
              label: "50th Percentile",
              data: lat50,
              fill: false,
              borderColor: "rgba(252,78,78,0.7)"
            },
            {
              label: "90th Percentile",
              data: lat90,
              fill: false,
              borderColor: "rgba(255,20,20,0.7)"
            }
          ]
        })
      })
    
  }

  const popCharts = () => {
    latChart()
    qpsChart()
  }



  return (
    <>
      <PageTitle>Results</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <SectionTitle>Experiment Results</SectionTitle>
        <Label className="mt-2 mb-4 flex flex-col">
              <span className='mb-2 text-lg'>Experiment ID</span>
              <select onChange={HandleEidChange} id="eidSelect" className='pl-3 mb-1 font-mono font-bold text-white w-full h-12 rounded-md bg-gray-600'>
                <option>No Experiment Selected</option>
              </select>
              <HelperText>The ID of the experiment (will be used to identify the experiment and retrieve it's results)</HelperText>
        </Label>

        <Button onClick={popCharts}>Populate Graphs</Button>

        <div className='my-4'>
          <Line data={qpsChartData}
          options={{
            title: {
              display: true,
              text: "QPS Data",
              fontColor: "rgba(0, 98, 255,0.7)",
              fontSize: 36,
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  fontColor: "rgba(69, 140, 255,0.7)",
                  fontSize: 18,
                  labelString: "Queries Per Second (QPS)"
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  fontColor: "rgba(69, 140, 255,0.7)",
                  fontSize: 18,
                  labelString: "Number of Clients"
                }
              }]
            }
          }}/>
        </div>

        <div className='my-4'>
          <Line data={latChartData} 
          options={{
            title: {
              display: true,
              text: "Latency Data",
              fontColor: "rgba(252, 20, 20,0.7)",
              fontSize: 36
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  fontColor: "rgba(255, 61, 61,0.7)",
                  fontSize: 18,
                  labelString: "Latency (ms)"
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  fontColor: "rgba(255, 61, 61,0.7)",
                  fontSize: 18,
                  labelString: "Number of Clients"
                }
              }]
            }
          }}/>
        </div>
      </div>
    </>
  )
}

export default Results
