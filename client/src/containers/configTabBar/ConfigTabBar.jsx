import React from 'react';
import "./configTabBar.css"

function ConfigTabBar() {
  return (
    <div className='configFull'>
      <div className='configTabBar'>
        <p className='configTab'>Load Generator</p>
        <p className='configTab2'>System Under Test</p>
        <p className='configTab3'>Network Emulation</p>
        <p className='configTab4'>Profiles</p>
        <p className='configTab5'>Cloud Development</p>
      </div>
      <div>
        {/* put each config page tab here */}
      </div>
    </div>
  )
}

export default ConfigTabBar;
