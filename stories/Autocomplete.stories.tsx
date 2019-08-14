import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Autocomplete from '../src/components/Autocomplete';

const autocompleteValues = [
  "apple", "ant", "ankle", "app", "anti-gravity", "appetizer", "anthony"
];

storiesOf('circulation-web/Autocomplete', module)
  .add('default', () => (
    <Autocomplete 
      autocompleteValues={autocompleteValues}
      disabled={false}
      name="test"
      label="Test"
      value="a"
    />
  ));
