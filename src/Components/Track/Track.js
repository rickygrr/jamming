import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <a className="Track-action"onClick={eventHandler to remove track}>-</a>
        } else {
            return <a className="Track-action" onClick={this.addTrack}>+</a>
        }
    }

    render() {
        return (
            <div className="Track">
              <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
              </div>
              {this.renderAction()}
            </div>
        );
    }
}
