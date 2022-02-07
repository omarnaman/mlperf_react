import React from 'react';
import './importButton.css';

class ImportButton extends React.Component {
  render() {
    return (
      <div>
        <button className='ImportButton'>Import Configuration From Disk</button>
      </div>
    )
  }
}

export default ImportButton;
