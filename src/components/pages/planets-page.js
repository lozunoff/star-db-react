import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PlanetDetails, PlanetList } from '../sw-components';
import Row from '../row';

const PlanetsPage = ({ match, history }) => {
  const { itemId } = match.params;

  return (
    <Row
      left={<PlanetList onItemSelected={({ baseUrl, pageNumber, id }) => history.push(`/${baseUrl}/${pageNumber}/${id}`)} />}
      right={<PlanetDetails itemId={itemId} />}
    />
  );
};

PlanetsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(PlanetsPage);
