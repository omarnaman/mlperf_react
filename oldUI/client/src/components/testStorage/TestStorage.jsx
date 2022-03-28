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
          document.getElementById("Id").innerHTML = "ID: " + newId;
          let tableref = document.getElementById("table");
          for (let i = 0; i < 10; i++) {  
            let newRow = tableref.insertRow(-1);
            let newCell = newRow.insertCell(0);
            let newCell2 = newRow.insertCell(-1);
            let newText = document.createTextNode(xData[i]);
            let newText2 = document.createTextNode(yData[i]);
            newCell.append(newText);
            newCell2.append(newText2);
          }
          document.getElementById("tableContain").style.padding = "0px 0px 291px 0px";
        }
        , 30);

  }

  render(){
    return (
      <div id="tableContain" className="tableContain">
        <button className="populateButton" onClick={this.getResult}>Display Results</button>
        <p className='Id' id="Id">ID: Waiting for Results</p>
        <table id="table">
          <thead>
            <tr>
              <th>dataX</th>
              <th>dataY</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TestStorage;
