import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { ChangePasswordForm } from '../src/components/ChangePasswordForm';

storiesOf('circulation-web/ChangePasswordForm', module)
  .add('default', () => (
    <ChangePasswordForm csrfToken="" />
  ));
