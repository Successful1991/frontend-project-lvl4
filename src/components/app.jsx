import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (<div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>);
  }
}

export default App;
