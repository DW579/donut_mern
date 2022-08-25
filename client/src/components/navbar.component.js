import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';


export default class Navbar extends Component {

  render() {
    return (
      <Row>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">Donut</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            {/* <Link to="/" className="nav-link">Campaigns</Link> */}
            </li>
          </ul>
          </div>
        </nav>
      </Row>
      
    );
  }
}