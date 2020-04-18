import React, { Component } from 'react';

import './error-button.css';

export default class ErrorButton extends Component {
  state = {
    renderError: false,
  };

  render() {
    const { renderError } = this.state;

    if (renderError) {
      this.foo.bar = 0;
    }

    return (
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => this.setState({ renderError: true })}
      >
        Throw Error
      </button>
    );
  }
}
