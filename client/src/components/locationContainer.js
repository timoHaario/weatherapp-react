import React, { Component } from 'react'; 
import LatestTemperatureComponent from './latestTemperatureComponent.js'
import TemperatureSubmitForm from './temperatureSubmitForm.js'

export default class locationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitValue: '',
      allTemperatures: [],
      latestTemperature: '',
      latestTemperatureDate: ''
    };
  }

  componentDidMount() {
    this.loadTemperatures(this.props.location);
  }

  loadTemperatures = async() => {
    const location = this.props.location;
    const response = await fetch('/api/location/'+location+'/temperatures');
    const body = await response.json();
    const length = await body.data.length;
    if (length > 0) {
      const latest = await body.data[length-1];
      this.setState({
        latestTemperature: await latest.temperature,
        latestTemperatureDate: await latest.timestamp
      });
    }  
  }

  render() {
    return (
      <div>
      <p>{this.props.location}</p>
      <LatestTemperatureComponent temperature={this.state.latestTemperature} date={this.state.latestTemperatureDate}/>
      <TemperatureSubmitForm location={this.props.location} loadTemperatures={this.loadTemperatures}/>
      </div>
    );
  }
}
