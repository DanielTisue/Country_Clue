import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li className="navabar-link">Home</li>
          <li className="navabar-link">About</li>
          <li className="navabar-link">The Latest</li>
          <li className="navabar-link">New Artist</li>
          <li className="navabar-link">Roadtrip Must Playlist</li>
        </ul>
      </div>
    )
  }
}

export default Navbar;