import React from 'react';
import "./configTabBar.css"
import LoadGenerator from '../configTabs/loadGenerator/LoadGenerator'
import SystemTest from '../configTabs/systemTest/SystemTest';

function ConfigTabBar() {

  let handleLoad = () => {
    document.getElementById('loadGeneratorTab').style.display = "flex";
    document.getElementById('configTab').style.borderRight = "0vh solid black;";
    document.getElementById('systemTestTab').style.display = "none";
    document.getElementById('configTab2').style.borderRight = "0.3vh solid black;";
  }

  let handleSystemTest = () => {
    document.getElementById('loadGeneratorTab').style.display = "none";
    document.getElementById('configTab').style.borderRight = "0.3vh solid black;";
    document.getElementById('systemTestTab').style.display = "flex";
    document.getElementById('configTab2').style.borderRight = "0vh solid black;";
  }

  return (
    <div className='configFull'>
      <div className='configTabBar'>
        <p onClick={handleLoad} id='configTab'>Load Generator</p>
        <p onClick={handleSystemTest} id='configTab2'>System Under Test</p>
        <p id='configTab3'>Network Emulation</p>
        <p id='configTab4'>Profiles</p>
        <p id='configTab5'>Cloud Development</p>
      </div>
      <div className='configTabContain'>
        <div id='loadGeneratorTab'>
          <LoadGenerator/>
        </div>
        <div id='systemTestTab'>
          <SystemTest/>
        </div>

      </div>
    </div>
  )
}

export default ConfigTabBar;
