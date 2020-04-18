import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import './paginator.css';

const Paginator = ({ allPages, match }) => {
  const { url, params: { pageNumber = '1', itemId = '' } } = match;
  const baseUrl = url.split('/')[1];

  const links = [];

  for (let i = 1; i <= allPages; i += 1) {
    const classList = i === Number(pageNumber) ? 'page-item active' : 'page-item';
    const item = (
      <li className={classList} key={`page${i}`}>
        <Link className="page-link" to={`/${baseUrl}/${i}/${itemId}`}>{i}</Link>
      </li>
    );
    links.push(item);
  }

  return (
    <nav aria-label="Page navigation" className="d-flex justify-content-center">
      <ul className="pagination">
        <li className="page-item">
          <PrevLink pageNumber={pageNumber} baseUrl={baseUrl} itemId={itemId} />
        </li>
        { links }
        <li className="page-item">
          <NextLink pageNumber={pageNumber} baseUrl={baseUrl} itemId={itemId} allPages={allPages} />
        </li>
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  allPages: PropTypes.number.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      pageNumber: PropTypes.string,
      itemId: PropTypes.string,
    }),
  }).isRequired,
};

const PrevLink = ({
  pageNumber, baseUrl, itemId,
}) => {
  if (Number(pageNumber) === 1) {
    return (
      <span className="page-link disabled" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </span>
    );
  }

  const prevPage = Number(pageNumber) - 1;
  return (
    <Link className="page-link" to={`/${baseUrl}/${prevPage}/${itemId}`} aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
      <span className="sr-only">Previous</span>
    </Link>
  );
};

PrevLink.propTypes = {
  pageNumber: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
};

const NextLink = ({
  pageNumber, baseUrl, itemId, allPages,
}) => {
  if (Number(pageNumber) === allPages) {
    return (
      <span className="page-link disabled" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </span>
    );
  }

  const nextPage = Number(pageNumber) + 1;
  return (
    <Link className="page-link" to={`/${baseUrl}/${nextPage}/${itemId}`} aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
      <span className="sr-only">Next</span>
    </Link>
  );
};

NextLink.propTypes = {
  pageNumber: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  allPages: PropTypes.number.isRequired,
};

export default withRouter(Paginator);
