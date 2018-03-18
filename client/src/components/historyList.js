import React, { Component } from 'react';

export default class historyList extends Component {

  getTimeFromEpoch(epoch) {
    let date = new Date(parseInt(epoch, 10));
    let weekdays = ["Su","Ma","Ti","Ke","To","Pe","La"];
    let weekday = weekdays[date.getDay()];
    let day = date.getDate();
    let month = date.getMonth() + 1; //getMonth returns 0-11
    let hour = ('0'+date.getHours()).slice(-2);
    let minute = ('0'+date.getMinutes()).slice(-2);
    let formattedTime = weekday + " " + day + "." + month + " " + hour + ":" + minute //Ma 12.3 15:15
    return formattedTime;
  }

  render() {
    return (
      <div className="history-list">
      {this.props.temperatures ?
        this.props.temperatures.slice().reverse().map(temperature => {
          return (
            <p className="history-value"key={temperature.timestamp}>
              {this.getTimeFromEpoch(temperature.timestamp)} {temperature.temperature + '°c'} 
            </p>
          )
        }) : ''}
        
      </div>
    );
  }

}