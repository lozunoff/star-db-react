import React from 'react';

import './spinner.css';

const Spinner = () => (
  <div className="lds-css d-flex justify-content-center align-items-center">
    <div className="lds-double-ring">
      <div />
      <div />
    </div>
  </div>
);

export default Spinner;
