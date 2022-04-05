import React, { useContext } from 'react'

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

  function handlePopulateQps() {
    const storageQps = "http://3.133.91.254:8087/qps/" + eid1;
    const qpsSec = ["qsel0", "qsel1", "qsel2", "qsel3"]
    const qpsids = ["qps0", "qps1", "qps2", "qps3"]
    fetch(storageQps)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        for (var idx = 0; idx < data.length && idx < 4; idx++) {
          document.getElementById(qpsSec[idx]).innerHTML = data[idx].selector;
          document.getElementById(qpsids[idx]).innerHTML = data[idx].qps;
        }
      })

  }

  function handlePopulateLatency() {
    const storageLatencies = "http://3.133.91.254:8087/latencies/" + eid1;
    const latSec = ["lsel0", "lsel1", "lsel2", "lsel3"]
    const latPerids = [["lat010", "lat050", "lat090"], ["lat110", "lat150", "lat190"], ["lat210", "lat250", "lat290"], ["lat310", "lat350", "lat390"]]
    fetch(storageLatencies)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        for (var idx = 0; idx < data.length && idx < 4; idx++) {
          var latencies = data[idx].latencies.split(",")
          const length = latencies.length
          latencies.sort(function (a, b) { return parseFloat(a) - parseFloat(b) })
          const per10 = latencies[parseInt(length * .10)]
          const per50 = latencies[parseInt(length * .50)]
          const per90 = latencies[parseInt(length * .90)]
          const pers = [per10, per50, per90]
          document.getElementById(latSec[idx]).innerHTML = data[idx].selector;
          for (let perIndex = 0; perIndex < latPerids[idx].length; perIndex++) {
            const element = latPerids[idx][perIndex];
            const per = pers[perIndex]
            document.getElementById(element).innerHTML = `${parseFloat(per).toFixed(2)} seconds`
          }
        }
      });

  }



  return (
    <>
      <PageTitle>Results</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <SectionTitle>Experiment Results</SectionTitle>
        <Label className="mt-4">
          <span>Experiment ID</span>
          <Input id="eid" className="mt-1" placeholder="The experiment's ID" onChange={HandleChange} />
        </Label>
        <div className="mt-4">
          <Button onClick={handlePopulateQps} size="small">Display Results of Experiment (QPS)</Button>
          <div className="mt-4">
            <SectionTitle>Experiment ID: {eid1}</SectionTitle>
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Selector</TableCell>
                    <TableCell>QPS Data</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="qsel0" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="qps0" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="qsel1" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="qps1" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="qsel2" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="qps2" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="qsel3" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="qps3" className="text-sm"></span>
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>



        <div className="mt-4">
          <Button onClick={handlePopulateLatency} size="small">Display Results of Experiment (Latency)</Button>
          <SectionTitle>Experiment ID: {eid1}</SectionTitle>
          <div className="mt-4">
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Selector</TableCell>
                    <TableCell>10th Percentile</TableCell>
                    <TableCell>50th Percentile</TableCell>
                    <TableCell>90th Percentile</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="lsel0" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="lat010" className="text-sm"></span>
                    </TableCell>
                    <TableCell>
                      <span id="lat050" className="text-sm"></span>
                    </TableCell>
                    <TableCell>
                      <span id="lat090" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="lsel1" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="lat110" className="text-sm"></span>
                    </TableCell>
                    <TableCell>
                      <span id="lat150" className="text-sm"></span>
                    </TableCell>
                    <TableCell>
                      <span id="lat190" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="lsel2" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="lat210" className="text-sm"></span>
                    </TableCell>
                    <TableCell>
                      <span id="lat250" className="text-sm"></span>
                    </TableCell>
                    <TableCell>
                      <span id="lat290" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="lsel3" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="lat310" className="text-sm"></span>
                    </TableCell>
                    <TableCell>
                      <span id="lat350" className="text-sm"></span>
                    </TableCell>
                    <TableCell>
                      <span id="lat390" className="text-sm"></span>
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Results
