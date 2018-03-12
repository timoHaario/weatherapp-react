import React, { Component } from 'react'; 

export default class historyList extends Component {

  getTimeFromEpoch(epoch) {
    let date = new Date(parseInt(epoch, 10));
    let weekdays = ["Su","Ma","Ti","Ke","To","Pe","La"];
    let weekday = weekdays[date.getDay()];
    let day = date.getDate();
    let month = date.getMonth() + 1; //getMonth returns 0-11
    let hour = date.getHours();
    let minute = date.getMinutes();
    let formattedTime = weekday + " " + day + "." + month + " " + hour + ":" + minute //Ma 12.3 15:15
    return formattedTime;
  }

  render() {
    return (
      <div>
      {this.props.temperatures ?
        this.props.temperatures.map(temperature => {
         return <p key={temperature.timestamp}>{this.getTimeFromEpoch(temperature.timestamp)} {temperature.temperature + '°c'} </p>
        }) : ''}
        
      </div>
    );
  }

}