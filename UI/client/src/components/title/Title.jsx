import React from 'react';
import './title.css';

class Title extends React.Component {
  render() {
    return (
      <div>
        <p className='title'>{this.props.name}</p>
      </div>
    )
  }
}

export default Title;
