import React, { Component } from 'react';

export default class locationHeader extends Component {

  render() {
    return (
      <div className="location-container-header"> 
        <p className="location-container-header-name">{this.props.location}</p>
        <p className="location-container-header-coordinates">{this.props.coordinates.x + ', ' + this.props.coordinates.y} </p>
      </div>
    );
  }
}
