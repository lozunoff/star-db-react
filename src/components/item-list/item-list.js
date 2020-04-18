import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Paginator from '../paginator';

import './item-list.css';

const ItemList = ({
  data, onItemSelected, children: renderLabel, match,
}) => {
  const { url, params: { pageNumber = '1' } } = match;
  const baseUrl = url.split('/')[1];

  const allPages = Math.ceil(data.length / 10);

  const start = pageNumber * 10 - 10;
  const end = pageNumber * 10;

  const items = data.slice(start, end).map((item) => {
    const { id } = item;
    const label = renderLabel(item);

    return (
      <li
        className="list-group-item"
        key={`item${id}`}
        onClick={() => onItemSelected({ baseUrl, pageNumber, id })}
        onKeyDown={() => onItemSelected({ baseUrl, pageNumber, id })}
        role="presentation"
      >
        {label}
      </li>
    );
  });

  return (
    <>
      <ul className="item-list list-group">
        {items}
      </ul>
      <Paginator allPages={allPages} />
    </>
  );
};

ItemList.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      pageNumber: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(ItemList);
