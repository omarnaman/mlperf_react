import React from 'react';
import './testGraph.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

let testData = [];
for (let j = 1; j < 11; j++){
  testData.push({name:j, x: j*5})
}
console.log(testData);

let newId = JSON.parse(localStorage.getItem("id"));

class TestGraph extends React.Component {
  render(){
    return (
      <div className="graphContain">
        <p className='Id' id="Id">ID: {newId}</p>
        <LineChart width={600} height={400} data={testData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="x" stroke="#8884d8" />
        </LineChart>
      </div>
    )
  }
}

export default TestGraph;
