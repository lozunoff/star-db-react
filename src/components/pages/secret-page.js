import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const SecretPage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <div className="jumbotron text-center">
        <h3>This page is full of secrets!!!</h3>
      </div>
    );
  }

  return <Redirect to="/login" />;
};

SecretPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SecretPage;
