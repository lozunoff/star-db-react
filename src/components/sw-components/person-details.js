import React from 'react';

import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers';

const PersonDetails = (props) => (
  <ItemDetails {...props}>
    <Record field="gender" label="Gender" />
    <Record field="eyeColor" label="Eye Color" />
    <Record field="birthYear" label="Birth Year" />
  </ItemDetails>
);

const mapMethodsToProps = (swapiService) => ({
  getData: swapiService.getPerson,
  getImageUrl: swapiService.getPersonImage,
});

export default withSwapiService(mapMethodsToProps)(PersonDetails);
