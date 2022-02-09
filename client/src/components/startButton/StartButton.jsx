import React, { useState } from 'react';
import './startButton.css';
import pause from './pause-button.png';
import load from './loading.png';
import { useNavigate } from "react-router-dom";

function StartButton() {
  const [id, setid] = useState("sdfa12");
  const [timeMs, settimeMs] = useState(20000);
  const [clients, setclients] = useState(4);

  let navigate = useNavigate();

  let visualProgress = (id) => {
    var timeID = setInterval(() => {
      console.log(id)
      let runningURL = "IsRunning/" + id;
      fetch(runningURL)
        .then(res => res.json())
        .then(data => {
          if (data.isRunning){
            document.getElementById("status").src = load
            document.getElementById("statusDescription").innerHTML = "jobId: " + id + " is running"
          } else {
            document.getElementById("statusDescription").innerHTML = "no job is running"
            document.getElementById("status").src = pause
            clearInterval(timeID)
          }
        }, () => {            
            document.getElementById("statusDescription").innerHTML = "no job is running"
            document.getElementById("status").src = pause})
    },500);
  }

  async function handleStart(){
    document.getElementById('bar').style.display = "flex"
    document.getElementById("in").style.animation = "fill 5s linear 1"
    document.getElementById('test').style.padding = "167px 0px 62px"
    setTimeout(() => {
      document.getElementById('bar').style.display = "none";
      document.getElementById('test').style.padding = "167px 0px 135px"
    },5500) 
    setTimeout(() => {
      navigate("/results");
    },5500)

    fetch('StartJob/5/5')
      .then(res => res.json())
      .then(data => {
        visualProgress(data.id)
        setid(data.id)
        settimeMs(data.timeMs)
        setclients(data.clients)}, () => console.log("job start failed"));
  }

  return (
    <div className='startContain'>
      <img alt="progress Icon" id="status" className="statusIcon" src={pause}></img>
      <div id="bar" class="bar">
        <div id="in" class="in"></div>
      </div>
      <p className="descript" id="statusDescription">no job is running</p>
      <button onClick={handleStart} className='StartButton'>Begin Experiment</button>
    </div>
  )
}

export default StartButton;
