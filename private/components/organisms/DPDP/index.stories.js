import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import BubbleChartAnnotation from 'components/atoms/BubbleChartAnnotation';
import DPDP from '.';
import config from './config';

storiesOf('Bubble Charts', module)
  .addDecorator(withApolloProvider())
  .add('Different Providers, Different Priorities', () =>
    (<DPDP
      startYear={2010}
      minYear={1999}
      maxYear={2015}
      config={config}
      annotation={<BubbleChartAnnotation />}
    />));
