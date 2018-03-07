import React, { Component } from 'react'; 

export default class historyList extends Component {

  getTimeFromEpoch(epoch) {
    let date = new Date(parseInt(epoch, 10));
    let hoursMinutes = date.toTimeString().substring(0,5);
    return hoursMinutes;
  }

  render() {
    return (
      <div>
      {this.props.temperatures ?
        this.props.temperatures.map(temperature => {
         return <p>Havaintopiste: {temperature.location} Lämpötila: {temperature.temperature + '°c'} {this.getTimeFromEpoch(temperature.timestamp)} </p>
        }) : ''}
        
      </div>
    );
  }

}