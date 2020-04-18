import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';

const PeoplePage = ({ history, match }) => {
  const { itemId } = match.params;

  return (
    <Row
      left={<PersonList onItemSelected={({ baseUrl, pageNumber, id }) => history.push(`/${baseUrl}/${pageNumber}/${id}`)} />}
      right={<PersonDetails itemId={itemId} />}
    />
  );
};

PeoplePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(PeoplePage);
