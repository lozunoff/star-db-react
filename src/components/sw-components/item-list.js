import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ItemList from '../item-list';

import {
  withData,
  withSwapiService,
  compose,
  withChildFunction,
} from '../hoc-helpers';

const renderName = ({ name }) => <span>{name}</span>;

renderName.propTypes = {
  name: PropTypes.string.isRequired,
};

const renderModelAndName = ({ model, name }) => <span>{name} ({model})</span>;

renderModelAndName.defaultProps = {
  model: 'unknown',
};

renderModelAndName.propTypes = {
  model: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const mapPersonMethodsToProps = (swapiService) => ({
  getData: swapiService.getAllPeople,
});

const mapPlanetMethodsToProps = (swapiService) => ({
  getData: swapiService.getAllPlanets,
});

const mapStarshipMethodsToProps = (swapiService) => ({
  getData: swapiService.getAllStarships,
});

const PersonList = compose(
  withSwapiService(mapPersonMethodsToProps),
  withRouter,
  withData,
  withChildFunction(renderName),
)(ItemList);

const PlanetList = compose(
  withSwapiService(mapPlanetMethodsToProps),
  withRouter,
  withData,
  withChildFunction(renderName),
)(ItemList);

const StarshipList = compose(
  withSwapiService(mapStarshipMethodsToProps),
  withRouter,
  withData,
  withChildFunction(renderModelAndName),
)(ItemList);

export { PersonList, PlanetList, StarshipList };
