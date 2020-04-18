import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { StarshipList } from '../sw-components';

const StarshipsPage = ({ history }) => (
  <StarshipList onItemSelected={({ baseUrl, id }) => history.push(`/${baseUrl}/detail/${id}`)} />
);

StarshipsPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(StarshipsPage);
