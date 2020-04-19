import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { withSwapiService } from '../hoc-helpers';

import './random-planet.css';

class RandomPlanet extends Component {
  static defaultProps = {
    updateInterval: 10000,
  };

  static propTypes = {
    updateInterval: PropTypes.number,
    getImageUrl: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
  };

  state = {
    planet: {},
    loading: true,
    error: false,
    image: {},
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    const { getImageUrl } = this.props;
    this.setState({
      planet,
      loading: false,
      image: getImageUrl(planet),
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updatePlanet= () => {
    const { getData } = this.props;
    const id = Math.floor(Math.random() * 60 + 1);
    getData(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    const {
      planet,
      loading,
      error,
      image,
    } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} image={image} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet, image }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [image]);

  const {
    name,
    population,
    rotationPeriod,
    diameter,
  } = planet;

  const addDefaultSrc = (ev) => {
    if (!error) {
      const { target } = ev;
      target.src = image.defaultSrc;
      setError(true);
    }
  };

  return (
    <>
      <img className="planet-image" src={image.src} alt="item" onError={addDefaultSrc} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

const mapMethodsToProps = (swapiService) => ({
  getData: swapiService.getPlanet,
  getImageUrl: swapiService.getPlanetImage,
});

PlanetView.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string,
    population: PropTypes.string,
    rotationPeriod: PropTypes.string,
    diameter: PropTypes.string,
  }).isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    defaultSrc: PropTypes.string,
  }).isRequired,
};

export default withSwapiService(mapMethodsToProps)(RandomPlanet);
