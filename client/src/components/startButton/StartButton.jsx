import React, { useState } from 'react';
import './startButton.css';
import pause from './pause-button.png';
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader"

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
            document.getElementById("statusDescription").innerHTML = "jobId: " + id + " is running"
            document.getElementById("moon").style.display = "flex";
            document.getElementById("status").style.display = "none";
          } else {
            document.getElementById("statusDescription").innerHTML = "no job is running"
            document.getElementById("status").style.display = "flex";
            document.getElementById("moon").style.display = "none";
            navigate("/results");
            clearInterval(timeID)
          }
        }, () => {            
            document.getElementById("statusDescription").innerHTML = "no job is running"
            document.getElementById("moon").style.display = "none";
            document.getElementById("status").style.display = "flex";})
    },500);
  }

  async function handleStart(){
    document.getElementById('bar').style.display = "flex"
    document.getElementById("in").style.animation = "fill 5s linear 1"
    document.getElementById('test').style.padding = "190px 0px 63px"
    setTimeout(() => {
      document.getElementById('bar').style.display = "none";
      document.getElementById('test').style.padding = "190px 0px 134px"
    },5500) 

    fetch('StartJob/5/5')
      .then(res => res.json())
      .then(data => {
        visualProgress(data.id)
        localStorage.setItem("id", JSON.stringify(data.id));
        setid(data.id)
        settimeMs(data.timeMs)
        setclients(data.clients)}, () => console.log("job start failed"));
  }

  return (
    <div className='startContain'>
      <img alt="progress Icon" id="status" className="statusIcon" src={pause}></img>
      <div id="moon" style={{ display: "none", margin: "0px 0px 56px 0px" }}>
        <MoonLoader size={150} />
      </div>
      <div id="bar" class="bar">
        <div id="in" class="in"></div>
      </div>
      <p className="descript" id="statusDescription">no job is running</p>
      <button onClick={handleStart} className='StartButton'>Begin Experiment</button>
    </div>
  )
}

export default StartButton;
