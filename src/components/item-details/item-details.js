import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Spinner from '../spinner';
import BackButton from '../back-button';

import './item-details.css';

const Record = ({ item, field, label }) => (
  <li className="list-group-item">
    <span className="term">{label}</span>
    <span>{item[field]}</span>
  </li>
);

Record.defaultProps = {
  item: null,
};

Record.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export { Record };

class ItemDetails extends Component {
  static defaultProps = {
    itemId: null,
  };

  static propTypes = {
    itemId: PropTypes.string,
    getData: PropTypes.func.isRequired,
    getImageUrl: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
  };

  state = {
    item: null,
    loading: true,
    image: {},
    error: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    const { itemId, getData, getImageUrl } = this.props;
    if (itemId !== prevProps.itemId
          || getData !== prevProps.getData
              || getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  }

  addDefaultSrc = (ev) => {
    const { image, error } = this.state;

    if (!error) {
      const { target } = ev;
      target.src = image.defaultSrc;
      this.setState({
        error: true,
      });
    }
  };

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    this.setState({
      loading: true,
    });

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false,
          image: getImageUrl(item),
          error: false,
        });
      });
  }

  render() {
    const { item, loading, image } = this.state;
    const { children, match } = this.props;

    if (!item) {
      return <span>Select an item from a list</span>;
    }

    const { name } = item;

    if (loading) {
      return <Spinner />;
    }

    const { url } = match;
    const isDetailPage = url.search('/detail/') !== -1;

    return (
      <div className="person-details card">
        <img className="person-image" src={image.src} alt="item" onError={this.addDefaultSrc} />

        <div className="card-body py-0">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(children, (child) => React.cloneElement(child, { item }))
            }
          </ul>
          { isDetailPage && (
            <div className="mt-2 d-flex justify-content-center">
              <BackButton />
            </div>
          ) }
        </div>
      </div>
    );
  }
}

export default withRouter(ItemDetails);
