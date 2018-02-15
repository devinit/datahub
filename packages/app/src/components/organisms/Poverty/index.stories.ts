import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import BubbleChartAnnotation from 'components/atoms/BubbleChartAnnotation';
import Poverty from '.';
import config from './config';

storiesOf('Bubble Charts', module)
  .addDecorator(withApolloProvider())
  .add('Poverty', () =>
    (<Poverty
      startYear={2010}
      minYear={1999}
      maxYear={2015}
      config={config}
      annotation={<BubbleChartAnnotation />}
    />),
  );
