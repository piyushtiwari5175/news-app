import React, { Component } from 'react';
import loadingspin from './loadingspin.gif';

export default class Spinning extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loadingspin} alt="Loading Spinner" />
      </div>
    );
  }
}
