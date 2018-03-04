import React, { Component } from 'react'; 

export default class latestTemperatureComponent extends Component {

  getTimeFromEpoch(epoch) {
    let date = new Date(parseInt(epoch, 10));
    let weekdays = ["Su","Ma","Ti","Ke","To","Pe","La"];
    let weekday = weekdays[date.getDay()];
    let hour = date.getHours();
    let minute = date.getMinutes();
    let formattedTime = weekday + " " + hour + ":" + minute
    return formattedTime;
  }

  render() {
    return (
      <div>
        <p>Lämpötila: {this.props.temperature ? this.props.temperature + '°c' : 'Ei havaintoja'}</p>
        <p>{this.props.date ? this.getTimeFromEpoch(this.props.date) : '' }</p>
      </div>
    );
  }

}