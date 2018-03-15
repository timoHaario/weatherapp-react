import React, { Component } from 'react';
import Validators from '../validators.js';

export default class temperatureSubmitForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postTemperature = this.postTemperature.bind(this);
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
      console.log("Virheellinen arvo")
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
        self.props.loadTemperatures();
      } else {
        console.log("Lähetys ei onnistunut")
      }
    })
  }

  validateTemperature(temperature) {
    return Validators.validTemperature(temperature);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="form-input">
          <input type="number" value={this.state.submitValue} onChange={this.handleInputChange} />
          <span className="form-unit-text">°c</span>
        </label>
        <input type="submit" value="Lähetä" />
      </form>
    );
  }
}