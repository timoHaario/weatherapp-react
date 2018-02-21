import React, { Component } from 'react'; 
import Validators from '../validators.js';

export default class temperatureForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitValue: '',
      latestTemperature: '',
      latestTemperatureDate: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postTemperature = this.postTemperature.bind(this);
  }

  componentDidMount() {
    this.loadLatestTemperature(this.props.location);
  }

  loadLatestTemperature = async() => {
    const location = this.props.location;
    const response = await fetch('/api/location/'+location+'/temperatures');
    const body = await response.json();
    const length = await body.data.length;
    if (length > 0) {
      const latest = await body.data[length-1];
      this.setState({latestTemperature: await latest.temperature, latestTemperatureDate: await latest.timestamp});
    } else {
      this.setState({latestTemperature: '0', latestTemperatureDate: 'Ei'})
    }
  }

  handleInputChange(event) {
    this.setState({submitValue: event.target.value});
  }

  handleSubmit(event) {
    this.postTemperature();
    this.clearForm();
    event.preventDefault();
  }

  clearForm() {
    this.setState({submitValue: ''});
  }

  postTemperature = async () => {
    let self = this;
    let location = this.props.location;
    let temperature = this.state.submitValue;

    if(!this.validateTemperature(temperature)) {
      console.log("Invalid temperature value")
      return;
    }

    fetch('/api/location/' + location + '/temperatures', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: location,
        temperature: temperature
      })
    }).then(function(res) {
      if(res.status === 200) {
        console.log('Säähavainto lähetetty onnistuneesti');
        self.loadLatestTemperature();
      } else {
        console.log("fail")
      }
    })
  }

  getTimeFromEpoch(epoch) {
    let date = new Date(parseInt(epoch, 10));
    let weekdays = ["Su","Ma","Ti","Ke","To","Pe","La"];
    let weekday = weekdays[date.getDay()];
    let hour = date.getHours();
    let minute = date.getMinutes();
    let formattedTime = weekday + " " + hour + ":" + minute
    return formattedTime;
  }

  validateTemperature(temperature) {
    return Validators.validTemperature(temperature);
  }

  render() {
    return (
      <div>
      <p>{this.props.location}</p>
      <p>Lämpötila: {this.state.latestTemperature}°c</p>
      <p>{this.getTimeFromEpoch(this.state.latestTemperatureDate)}</p>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.submitValue} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}
