import React from 'react';
import './startButton.css';

class StartButton extends React.Component {
  constructor() {
    super();
    this.state = {id:"sdfas", timeMS:20000, clients:2};
  }

  handleStart() {
    console.log("button clicked");
    fetch("/StartJob/4/10")
            .then(res => res.json())
            .then(data => this.setState(data), () => console.log(this.state.id))
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
