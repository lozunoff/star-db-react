import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ErrorButton from '../error-button';

import './header.css';

const Header = ({ onServiceChange, isLoggedIn, onLogout }) => (
  <div className="header d-flex">
    <h3>
      <Link to="/">StarDB</Link>
    </h3>
    <ul className="d-flex">
      <li>
        <Link to="/people/">People</Link>
      </li>
      <li>
        <Link to="/planets/">Planets</Link>
      </li>
      <li>
        <Link to="/starships/">Starships & Vehicles</Link>
      </li>
      <li>
        <Link to="/secret">Secret</Link>
      </li>
      <li>
        { !isLoggedIn && <Link to="/login">Login</Link> }
        { isLoggedIn && <Link to="/" onClick={onLogout}>Logout</Link> }
      </li>
    </ul>
    <div className="d-flex ml-auto mr-2">
      <span className="d-flex align-items-center">Data source:</span>
      <select className="form-control form-control-sm ml-2" onChange={(e) => onServiceChange(e.target.value)}>
        <option value="swapi">swapi.dev</option>
        <option value="localhost">json-server</option>
        <option value="github">github.com</option>
      </select>
    </div>
    <ErrorButton />
  </div>
);

Header.propTypes = {
  onServiceChange: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
