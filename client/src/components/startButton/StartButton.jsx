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

  updateProgress(i){
    document.getElementById("progressNum").innerHTML = i;
    document.getElementById("bar").value = i;
  }

  handleStart() {
    document.getElementById('bar').style.display = "flex"
    document.getElementById("in").style.animation = "fill 6s linear 1"
    document.getElementById('test').style.padding = "167px 0px 62px"
    setTimeout(() => {
      document.getElementById('bar').style.display = "none";
      document.getElementById('test').style.padding = "167px 0px 135px"
    }, 6500) 

    fetch('StartJob/5/5')
      .then(res => res.json())
      .then(data => this.setState(data), () => console.log("job started"))

      console.log(this.state.id); 

  }
  
  componentDidMount() {
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
    },500);
  }  

  render() {
    return (
      <div className='startContain'>
        <img id="status" className="statusIcon" src={pause}></img>
        {/* <div className='progressTogether'>
          <label className="barLabel">Job Progress: </label>
          <p className="barLabel" id="progressNum"> None Running</p> 
        </div>
        <progress id="bar" className="bar" max="100" value="0"></progress> */}
        <div id="bar" class="bar">
          <div id="in" class="in"></div>
        </div>
        <p className="descript" id="statusDescription">no job is running</p>
        <button onClick={this.handleStart} className='StartButton'>Begin Experiment</button>
      </div>
    )
  }
}

export default StartButton;
