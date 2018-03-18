import React, { Component } from 'react';
import LatestTemperature from './latestTemperature.js'
import TemperatureSubmitForm from './temperatureSubmitForm.js'
import DailyRecords from './dailyRecords.js'
import HistoryList from './historyList.js'
import LocationHeader from './locationHeader.js'
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
    this.loadTemperatures();
  }

  loadTemperatures = async() => {
    const location = this.props.location;
    try {
      const response = await fetch('/api/location/'+location+'/temperatures');
      const body = await response.json();
      this.updateTemperatures(body.data);
    } catch (error) {
      console.error(error);
    }
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
    let arrayLength = temperaturesToday.length;
    let record = '';

    if (arrayLength > 0) {
      const reducerHighest = (record, currentValue) => currentValue.temperature > record.temperature ? currentValue : record;
      const reducerLowest  = (record, currentValue) => currentValue.temperature < record.temperature ? currentValue : record;
      if(highest) {
        record = temperaturesToday.reduce(reducerHighest)
      } else { //lowest
        record = temperaturesToday.reduce(reducerLowest)
      }
    }
    return record;
  }

  toggleHistoryListVisibility () {
    this.setState({
      historyListVisible: !this.state.historyListVisible
    })
  }

  hasRecordings() {
    return this.state.allTemperatures.length > 0;
  }

  hasRecordingsToday() {
    let oneDayAgo = Date.now() - 1000 * 60 * 60 * 24;
    let temperaturesToday = this.state.allTemperatures.filter(temperature => oneDayAgo < temperature.timestamp);
    return temperaturesToday.length > 0;
  }

  render() {
    return (
      <div className="location-container">
        <LocationHeader 
          location={this.props.location} 
          coordinates={this.props.coordinates}/>

        <LatestTemperature temperature={this.state.latestTemperature}/>

        {this.hasRecordingsToday() && 
          <DailyRecords 
            highest={this.state.highestTemperature} 
            lowest={this.state.lowestTemperature} />}

        <TemperatureSubmitForm 
          location={this.props.location} 
          loadTemperatures={this.loadTemperatures}/>

        {this.hasRecordings() && 
          <button 
            onClick={this.toggleHistoryListVisibility.bind(this)}>
            Näytä historia
          </button>}

        {this.state.historyListVisible && 
          <HistoryList 
            temperatures={this.state.allTemperatures} />}
            
      </div>
    );
  }
}
