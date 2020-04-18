import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => class extends Component {
  static propTypes = {
    getData: PropTypes.func.isRequired,
  };

  state = {
    data: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps) {
    const { getData } = this.props;
    if (getData !== prevProps.getData) {
      this.update();
    }
  }

  update() {
    const { getData } = this.props;

    this.setState({
      loading: true,
      error: false,
    });

    getData()
      .then((data) => {
        this.setState({
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
    const { data, loading, error } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <View {...this.props} data={data} />;
  }
};

export default withData;
