import React, { Component } from 'react';
import './App.css';
import LocationContainer from './components/locationContainer.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      locations:[]
    };
  }

  componentDidMount() {
    this.loadLocationsToState();
  }

  loadLocationsToState = async () => {
    try {
      const response = await fetch('/api/location');
      const body = await response.json();
      this.setState({locations: await body.data});
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="parent-container">
        {this.state.locations.map(loc => {
          return <LocationContainer key={loc.name} location={loc.name} coordinates={loc.coordinates}/>
        })} 
      </div>
    );
  }
}

export default App;
