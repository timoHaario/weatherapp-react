import React, { Component } from 'react'; 

export default class dailyRecords extends Component {

  getHoursMinutesFromEpoch(epoch) {
    let date = new Date(parseInt(epoch, 10));
    let hoursMinutes = date.toTimeString().substring(0,5);
    return hoursMinutes;
  }

  render() {
    return (
      <div>
        <p>Ylin: {this.props.highest ? this.props.highest.temperature + '°c' : 'Ei havaintoja'} 
        {this.props.highest ? ' ' + this.getHoursMinutesFromEpoch(this.props.highest.timestamp) : '' }</p>
        <p>Alin: {this.props.lowest ? this.props.lowest.temperature + '°c' : 'Ei havaintoja'} 
        {this.props.lowest ? ' ' + this.getHoursMinutesFromEpoch(this.props.lowest.timestamp) : '' }</p>
      </div>
    );
  }

}