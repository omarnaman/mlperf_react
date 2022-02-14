import React from 'react';
import './testStorage.css';

class TestStorage extends React.Component {

  getResult() {
    let xData, yData, newId;
    let id = JSON.parse(localStorage.getItem("id"));
    let resultUrl = "http://localhost:8082/GetResults/" + id;
    console.log(resultUrl);
    fetch(resultUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data[0].dataX)
        xData = data[0].dataX
        console.log(data[0].dataY)
        yData = data[0].dataY
        console.log(data[0].id)
        newId = data[0].id}, () => console.log("failed to get results"))

        setTimeout(() => {
          for (let i = 0; i < 5; i++){
          document.getElementById("dataX" + i).innerHTML = xData[i];
          document.getElementById("dataY" + i).innerHTML = yData[i];
        }}, 500)
  }


  render(){
    return (
      <div>
        <button onClick={this.getResult}>Get Results</button>
        <table>
          <thead>
            <tr>
              <th>dataX</th>
              <th>dataY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="dataX0">filler for now</td>
              <td id="dataY0"></td>
            </tr>
            <tr>
              <td id="dataX1"></td>
              <td id="dataY1"></td>
            </tr>
            <tr>
              <td id="dataX2"></td>
              <td id="dataY2"></td>
            </tr>
            <tr>
              <td id="dataX3"></td>
              <td id="dataY3"></td>
            </tr>
            <tr>
              <td id="dataX4"></td>
              <td id="dataY4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TestStorage;
