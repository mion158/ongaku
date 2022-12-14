
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  //hardcode for now
      searchResults: [{ name: 'name', artist: 'artist', album: 'album', id: 1 }, { name: 'name2', artist: 'artist2', album: 'album2', id: 2 }],
      playlistName: 'My new playlist',
      playlistTrack: [{ name: 'name3', artist: 'artist3', album: 'album3', id: 3 }, { name: 'name4', artist: 'artist4', album: 'album4', id: 4 }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTrack;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTrack: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTrack;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTrack: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    alert('New playlist saved')
    const trackURIs = this.state.playlistTrack.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>{
      this.setState({
        playlistName: 'My new playlist',
        playlistTrack: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    });
  }

  render() {
    return (
      <div>
        <h1>On<span className="highlight">ga</span>ku</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTrack={this.state.playlistTrack} onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
