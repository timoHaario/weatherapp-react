import React, { Component } from 'react';
import './App.css';
import LocationContainer from './components/locationContainer.js';

class App extends Component {

  constructor() {
    super();
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

  render() {
    return (
      <div className="App">
        {this.state.locations.map(loc => {
          return <LocationContainer key={loc.name} location={loc.name}/>
        })} 
      </div>
    );
  }
}

export default App;
