import React, { Component } from 'react';
import Validators from '../validators.js';

export default class temperatureSubmitForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitValue: '',
      errorMessage: false
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
      this.state.errorMessage = true;
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
        self.state.errorMessage = false;
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
      <div>
        {this.state.errorMessage ? <p className="form-error-message">Virheellinen arvo</p> : ''}
        <form onSubmit={this.handleSubmit}>
          <label className="form-input">
            <input 
              className="form-input-field" 
              type="number" step="0.01" 
              value={this.state.submitValue} 
              onChange={this.handleInputChange} />
            <span className="form-input-unit-text">°c</span>
          </label>
          <input type="submit" value="Lähetä" />
        </form>
      </div>
    );
  }
}