import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  SecretPage,
  LoginPage,
} from '../pages';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import SwapiServiceGithub from '../../services/swapi-service-github';
import { SwapiServiceProvider } from '../swapi-service-context';
import StarshipDetails from '../sw-components/starship-details';

import './app.css';

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false,
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  onLogout = () => {
    this.setState({
      isLoggedIn: false,
    });
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? SwapiServiceGithub : SwapiService;
      return {
        swapiService: new Service(),
      };
    });
  };

  render() {
    const { isLoggedIn, swapiService } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={swapiService}>
          <Router>
            <div className="stardb-app">
              <Header
                onServiceChange={this.onServiceChange}
                isLoggedIn={isLoggedIn}
                onLogout={this.onLogout}
              />

              <RandomPlanet />

              <Switch>
                <Route path="/" render={() => <h3 className="jumbotron text-center">Welcome to StarDB</h3>} exact />
                <Route path="/people/:pageNumber?/:itemId?" component={PeoplePage} />
                <Route path="/planets/:pageNumber?/:itemId?" component={PlanetsPage} />
                <Route path="/starships/:pageNumber?" component={StarshipsPage} exact />
                <Route path="/starships/detail/:itemId" render={({ match }) => <StarshipDetails itemId={match.params.itemId} />} />
                <Route path="/login" render={() => (<LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />)} />
                <Route path="/secret" render={() => (<SecretPage isLoggedIn={isLoggedIn} />)} />
                <Route render={() => <h3 className="jumbotron text-center">Page not found</h3>} />
              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
