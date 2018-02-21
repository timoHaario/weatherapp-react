import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import TemperatureForm from './components/temperatureForm.js';

class App extends Component {
/*
  constructor(props) {
    super(props);
    this.state = {locations:[]};
  }

  componentDidMount() {
    this.loadLocations();
  }

  loadLocations = async () => {
    const response = await fetch('/api/location');
    const body = await response.json();
    this.setState({locations: await body.data});

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
*/
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
