import React from 'react';
import './button.css';

class Button extends React.Component {

  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <button className='Button' onClick={this.props.onClick}>{this.props.text}</button>
      </div>
    )
  }
}

export default Button;
