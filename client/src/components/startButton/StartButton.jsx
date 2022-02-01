import React from 'react';
import './startButton.css';

class StartButton extends React.Component {
  constructor() {
      super();
      this.state = {id:"sdfa12", timeMS:20000, clients:4};
  }

  async componentDidMount() {
    fetch('http://localhost:8081/StartJob/4/4')
      .then(res => res.json())
      .then(data => this.setState(data), () => console.log(this.state.id))
  }

  /*componentDidMount(){
    fetch('/test')
      .then(res => res.json())
      .then(data => console.log(data), () => console.log("test fetched"))
  }*/

  render() {
    return (
      <div>
        <button onClick={this.handleStart} className='StartButton'>Begin Experiment</button>
      </div>
    )
  }
}

export default StartButton;
