import React, { Component } from 'react';

import logo from './logo.svg';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: "New Playlist",
            playlistTracks: []
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
          return;
        }
        const playlist = this.state.playlistTracks;
        playlist.push(track);
        this.setState({playlistTracks: playlist});


    removeTrack(track) {
        const playlist = this.state.playlistTracks.filter(trackToRemove => trackToRemove.id === track.id);
        this.setState({playlistTracks: playlist});
    }

    updatePlaylistName(newName) {
        this.setState({playlistName: newName});
    }

    savePlaylist() {
        let trackURIS = this.state.playlistTracks.map(track => track.uri);
    }

    render() {
    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
              <SearchBar />
              <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
                />
              </div>
            </div>
      </div>
    );
    }
}

export default App;
