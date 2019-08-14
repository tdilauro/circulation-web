import * as React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome', module)
  .add('introduction', () => 
    <div>
      <h2>Library Simplified Circulation Admin</h2>
      <p>
        Welcome to the documentation for high-level components used in Circulation Admin.
      </p>
    </div>,
    {
      info: {
        disable: true
      }
    }
  );
