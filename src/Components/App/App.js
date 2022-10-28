
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>On<span className="highlight">ga</span>ku</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            {/* <SearchResults />
            <Playlist /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
