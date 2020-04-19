import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => class extends Component {
  static propTypes = {
    getData: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  state = {
    data: null,
    allPages: 1,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps) {
    const { getData, match } = this.props;
    const { pageNumber } = match.params;
    const prevNumber = prevProps.match.params.pageNumber;

    if (getData !== prevProps.getData
          || (pageNumber !== prevNumber && prevNumber)
                || (pageNumber > 1 && !prevNumber)) {
      this.update();
    }
  }

  update() {
    const { getData, match } = this.props;
    const { pageNumber } = match.params;

    this.setState({
      loading: true,
      error: false,
    });

    getData(pageNumber)
      .then(({ allPages, data }) => {
        this.setState({
          allPages,
          data,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  render() {
    const {
      allPages, data, loading, error,
    } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <View {...this.props} data={data} allPages={allPages} />;
  }
};

export default withData;
