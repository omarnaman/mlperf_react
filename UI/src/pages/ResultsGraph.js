import React, { useContext, useEffect, useState } from 'react'

import { ConfigContext } from '../context/ConfigContext';
import { Input, Label, Select, Button } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import ChartCard from '../components/Chart/ChartCard'
import { Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import {
  lineOptions,
  lineLegends,
} from '../utils/demo/chartsData'

import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Pagination
} from '@windmill/react-ui'
import { Chart } from 'chart.js';


function Results() {
  const {eidContext, configContext} = useContext(ConfigContext);
  const [eid,setEid] = eidContext;
  const [config,setConfig] = configContext;

  var eid1 = ""

  function HandleChange(e) {
    const value = e.target.value;
    console.log(value)
    eid1 = value;
  }

  var retrievedData = false;
  var qpsSelectors = [];
  var qpsData = [];
  var latencySelectors = [];
  var latencyData = [];

  const storageLatencies = "http://3.133.91.254:8087/latencies/" + eid1;

  const [chartData, setChartData] = useState({})

  const chart = () => {
    const storageQps = "http://3.133.91.254:8087/qps/" + eid1;
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
        retrievedData = !retrievedData

        setChartData({
          labels: qpsSelectors,
          datasets: [
            {
              label: "Number of Clients",
              data: qpsData,
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)"
            }
          ]
        })
      })
  }

  useEffect(() => {
    chart();
  }, []);

  // fetch(storageLatencies)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     data.forEach(element => {
  //       latencySelectors.push(element.selector)
  //       latencyData.push(element.latencies)
  //     })
  //     console.log(latencyData)
  //   })

  return (
    <>
      <PageTitle>Results</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <SectionTitle>Experiment Results</SectionTitle>
        <Label className="mt-4">
          <span>Experiment ID</span>
          <Input id="eid" className="mt-1" placeholder="The experiment's ID" onChange={HandleChange} />
        </Label>

        <Button onClick={chart}>Populate Graph</Button>

        <Line data={chartData} 
        options={{
          title: {
            display: true,
            text: "QPS Data",
            fontSize: 20
          }
        }}/>
      </div>
    </>
  )
}

export default Results
