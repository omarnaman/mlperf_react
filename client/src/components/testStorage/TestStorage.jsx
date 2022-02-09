import React from 'react';
import './testStorage.css';

class TestStorage extends React.Component {

  getResult() {
    let id = "a608f3ab-2436-49c8-b0b4-1c44053e9433"
    let resultUrl = "http://localhost:8082/GetResults/" + id;
    fetch(resultUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data.dataX)
        console.log(data.dataY)
        console.log(data.id)}, () => console.log("failed to get results"));
  }

  render(){
    return (
      <div>
        <button onClick={this.getResult}>testing storage</button>
      </div>
    )
  }
}

export default TestStorage;
