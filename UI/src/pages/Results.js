import React from 'react'

import { Input, Label, Select, Button } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import ChartCard from '../components/Chart/ChartCard'
import {Line} from 'react-chartjs-2'
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

  var eid = "testing"
  const storageQps = "http://3.133.91.254:8087/qps/" + eid;
  const storageLatencies = "http://3.133.91.254:8087/latencies/" + eid;
  const qpsSec = ["qsel0", "qsel1", "qsel2", "qsel3"]
  const qpsids = ["qps0", "qps1", "qps2", "qps3"]
  const latSec = ["lsel0", "lsel1", "lsel2", "lsel3"]
  const latids = ["lat0", "lat1", "lat2", "lat3"]

    function handlePopulateQps() {
    fetch(storageQps)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        for (var idx = 0; idx < data.length - 1 && idx < 4; idx++){
          document.getElementById(qpsSec[idx]).innerHTML = data[idx].selector;
          document.getElementById(qpsids[idx]).innerHTML = data[idx].qps;
        }
      })
    
  }

  function handlePopulateLatency() {
    fetch(storageLatencies)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        for (var idx = 0; idx < data.length - 1 && idx < 4; idx++){
          document.getElementById(latSec[idx]).innerHTML = data[idx].selector;
          document.getElementById(latids[idx]).innerHTML = data[idx].latencies.split(',').map(element => {
          return element.substring(0,1);
        });
        }
      })

  }

  return (
    <>
      <PageTitle>Results</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <SectionTitle>Experiment Results</SectionTitle>
        <div className="mt-4">
          <Button onClick={handlePopulateQps} size="small">Display Results of Experiment (QPS)</Button>
          <div className="mt-4">
            <SectionTitle>Experiment ID: {eid}</SectionTitle>
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
          <SectionTitle>Experiment ID: {eid}</SectionTitle>
          <div className="mt-4">
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Selector</TableCell>
                    <TableCell>Latency Data</TableCell>
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
                      <span id="lat0" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="lsel1" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="lat1" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="lsel2" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="lat2" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <span id="lsel3" className="font-semibold ml-2"></span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span id="lat3" className="text-sm"></span>
                    </TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        {/* <SectionTitle>Jobid: 04f645f2-92a5-8260-91c2bc267b71</SectionTitle>

        <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <div className="mt-10">
          <SectionTitle>Jobid: 04f645f2-92a5-8260-91c2bc267b71</SectionTitle>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>DataX</TableCell>
                  <TableCell>DataY</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <span className="font-semibold ml-2">1</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">4</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <span className="font-semibold ml-2">2  </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">48</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <span className="font-semibold ml-2">3  </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">40</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <span className="font-semibold ml-2">4  </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">54</span>
                  </TableCell>
                </TableRow>
                
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination totalResults={4} resultsPerPage={4} onChange={() => {}} label="Table navigation" />
            </TableFooter>
          </TableContainer>
        </div> */}



      </div>
    </>
  )
}

export default Results
