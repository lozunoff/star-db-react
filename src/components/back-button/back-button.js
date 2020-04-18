import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const BackButton = ({ history }) => (
  <button
    type="button"
    className="btn btn-warning btn-lg"
    onClick={history.goBack}
  >
    Back To List
  </button>
);

BackButton.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default withRouter(BackButton);
