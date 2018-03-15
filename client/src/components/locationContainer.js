import React, { Component } from 'react';
import LatestTemperature from './latestTemperature.js'
import TemperatureSubmitForm from './temperatureSubmitForm.js'
import DailyRecords from './dailyRecords.js'
import HistoryList from './historyList.js'
import '../App.css';

export default class locationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      historyListVisible: false,
      submitValue: '',
      allTemperatures: [],
      latestTemperature: '',
      highestTemperature: '',
      lowestTemperature: ''
    };
  }

  componentDidMount() {
    this.loadTemperatures(this.props.location);
  }

  loadTemperatures = async() => {
    const location = this.props.location;
    const response = await fetch('/api/location/'+location+'/temperatures');
    const body = await response.json();
    this.updateTemperatures(body.data);
  }

  updateTemperatures(temperatures) {
    const dataLength = temperatures.length;
    if (dataLength > 0) {
        let latest = temperatures[dataLength - 1];
        let highest = this.findDailyRecordTemperature(temperatures, true);
        let lowest = this.findDailyRecordTemperature(temperatures, false);
        this.setState({
          allTemperatures: temperatures,
          latestTemperature: latest,
          highestTemperature: highest,
          lowestTemperature: lowest
        })

    }
  }

  findDailyRecordTemperature(temperatures, highest) {
    let oneDayAgo = Date.now() - 1000 * 60 * 60 * 24;
    let temperaturesToday = temperatures.filter(temperature => oneDayAgo < temperature.timestamp);
    let record = '';
    let arrayLength = temperaturesToday.length;

    if (arrayLength > 0) {
      record = temperaturesToday[0]
      for (var i = 0; i < arrayLength; i++) {
        const candidate = temperaturesToday[i]
        if (highest) {
          if (candidate.temperature > record.temperature) {
            record = temperaturesToday[i]
          }
        } else {
          if (candidate.temperature < record.temperature) {
            record = temperaturesToday[i]
          }
        }
      }
    }

    return record;
  }

  toggleListVisibility () {
    this.setState({
      historyListVisible: !this.state.historyListVisible
    })
  }

  hasRecordings() {
    return this.state.allTemperatures.length > 0;
  }

  render() {
    return (
      <div className="location-container">
        <p className="location-container-header">{this.props.location}</p>
        <LatestTemperature temperature={this.state.latestTemperature}/>
        {this.hasRecordings() && <DailyRecords highest={this.state.highestTemperature} lowest={this.state.lowestTemperature} />}
        <TemperatureSubmitForm location={this.props.location} loadTemperatures={this.loadTemperatures}/>
        {this.hasRecordings() && <button onClick={this.toggleListVisibility.bind(this)} >Näytä historia</button>}
        {this.state.historyListVisible && <HistoryList temperatures={this.state.allTemperatures} />}
      </div>
    );
  }
}
