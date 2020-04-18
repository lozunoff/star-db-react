import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginPage = ({ isLoggedIn, onLogin }) => {
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="jumbotron text-center">
      <p>Login to see secret page!</p>
      <button type="button" className="btn btn-primary" onClick={onLogin}>Login</button>
    </div>
  );
};

LoginPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
