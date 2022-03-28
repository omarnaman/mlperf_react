import React from 'react'

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
  return (
    <>
      <PageTitle>Results</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Jobid: 04f645f2-92a5-8260-91c2bc267b71</SectionTitle>

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
        </div>

      </div>
    </>
  )
}

export default Results
