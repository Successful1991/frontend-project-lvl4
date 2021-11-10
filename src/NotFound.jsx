import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (<div className='container-lg d-flex align-items-center justify-content-center flex-column h-100'>
      <h1 className='text-center'>Page is not found</h1>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </div>);
  }
}

export default NotFound;
