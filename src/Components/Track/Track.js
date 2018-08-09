import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    renderAction() {
        if (this.props.isRemoval) {
            return <a onClick={eventHandler to remove track}>-</a>
        } else {
            return <a onClick={eventHandler to addTrack}>+</a>
        }
    }
    render() {
        return (
            <div className="Track">
              <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
              </div>
              <a className="Track-action"><!-- + or - will go here --></a>
            </div>
        );
    }
}
