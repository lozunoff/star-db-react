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
    <button type="button" className="btn btn-primary btn-sm ml-auto mr-2" onClick={onServiceChange}>Change Service</button>
    <ErrorButton />
  </div>
);

Header.propTypes = {
  onServiceChange: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
