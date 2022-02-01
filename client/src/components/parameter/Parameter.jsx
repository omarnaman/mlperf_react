import React from 'react';
import './parameter.css';

class Parameter extends React.Component {
  render(){
    return (
      <div>
        <p className="paramTitle">{this.props.title} {this.props.num}:</p>
      </div>
    )
  }
}

export default Parameter;
