import React from 'react';
import './startButton.css';
import pause from './pause-button.png';
import load from './loading.png';

class StartButton extends React.Component {
  constructor() {
      super();
      this.handleStart = this.handleStart.bind(this);
      this.state = {id:"sdfa12", timeMS:20000, clients:4};
  }

  handleStart() {
    fetch('StartJob/5/5')
      .then(res => res.json())
      .then(data => this.setState(data), () => console.log("job started"))

      console.log(this.state.id);

  }
  
 /* componentDidMount() {
    var timeID = setInterval(() => {
      let runningURL = "IsRunning/" + this.state.id;
      let resp = {};
      fetch(runningURL)
        .then(res => res.json())
        .then(data => {
          if (data.isRunning){
            document.getElementById("status").src = load
            document.getElementById("statusDescription").innerHTML = "jobId: " + this.state.id + " is running"
          } else {
            document.getElementById("statusDescription").innerHTML = "no job is running"
            document.getElementById("status").src = pause
          }
        }, () => {            
            document.getElementById("statusDescription").innerHTML = "no job is running"
            document.getElementById("status").src = pause})
    },700);
  }  */

  render() {
    return (
      <div className='startContain'>
        <img id="status" className="statusIcon" src={pause}></img>
        <p className="descript" id="statusDescription">no job is running</p>
        <button onClick={this.handleStart} className='StartButton'>Begin Experiment</button>
      </div>
    )
  }
}

export default StartButton;
