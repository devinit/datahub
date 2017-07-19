import React from 'react';
import { storiesOf } from '@storybook/react';
import UnbundlingAidTour from 'components/atoms/UnbundlingAidTour';
import GlobalVisualizationTour from 'components/atoms/GlobalVisualizationTour';
import Tour from '.';

storiesOf('Tour', module)
  .add('Global Viz tour', () => (
    <Tour>
      <GlobalVisualizationTour />
    </Tour>
      ))
  .add('UnbundlindAid tour', () => (
    <Tour>
      <UnbundlingAidTour />
    </Tour>
  ));
