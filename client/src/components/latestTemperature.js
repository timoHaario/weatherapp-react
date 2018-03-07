import React, { Component } from 'react'; 

export default class latestTemperature extends Component {

  getTimeFromEpoch(epoch) {
    let date = new Date(parseInt(epoch, 10));
    let hoursMinutes = date.toTimeString().substring(0,5);
    return hoursMinutes;
  }

  render() {
    return (
      <div>
        <p>Lämpötila: {this.props.temperature ? this.props.temperature.temperature + '°c' : 'Ei havaintoja'} 
        {this.props.temperature ? ' ' + this.getTimeFromEpoch(this.props.temperature.timestamp) : '' }</p>
      </div>
    );
  }

}