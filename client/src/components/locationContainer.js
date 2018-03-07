import React, { Component } from 'react'; 
import LatestTemperature from './latestTemperature.js'
import TemperatureSubmitForm from './temperatureSubmitForm.js'
import DailyRecords from './dailyRecords.js'

export default class locationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
          allTempeartures: temperatures,
          latestTemperature: latest,
          highestTemperature: highest,
          lowestTemperature: lowest
        })

    }
  }

  findDailyRecordTemperature(temperatures, highest) {
    const ONE_DAY = 1000 * 60 * 60 * 24; //one day in milliseconds
    let record = temperatures[0];
    let arrayLength = temperatures.length;

    for (var i = 0; i < arrayLength; i++) {
      const candidate = temperatures[i]
      const withinOneDay = (Date.now() - ONE_DAY) < candidate.timestamp
      if (highest) {
        if (withinOneDay && candidate.temperature > record.temperature) {
          record = temperatures[i]
        } 
      } else {
        if (withinOneDay && candidate.temperature < record.temperature) {
          record = temperatures[i]
        }
      }
    }

    return record;
  }

  render() {
    return (
      <div>
        <p>{this.props.location}</p>
        <LatestTemperature temperature={this.state.latestTemperature}/>
        <DailyRecords highest={this.state.highestTemperature} lowest={this.state.lowestTemperature} />
        <TemperatureSubmitForm location={this.props.location} loadTemperatures={this.loadTemperatures}/>
      </div>
    );
  }
}
