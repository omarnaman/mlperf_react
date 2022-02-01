import React from 'react';
import './startButton.css';

class StartButton extends React.Component {
  constructor() {
      super();
      this.state = {id:"sdfa12", timeMS:20000, clients:4};
  }

  handleStart() {
    fetch('StartJob/5/5')
      .then(res => res.json())
      .then(data => console.log(data), () => console.log("job started"))
  }
  
  componentDidMount(){
    fetch('test')
      .then(res => res.json())
      .then(data => console.log(data), () => console.log("test fetched"))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleStart} className='StartButton'>Begin Experiment</button>
      </div>
    )
  }
}

export default StartButton;
