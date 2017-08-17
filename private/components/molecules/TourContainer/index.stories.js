import React from 'react';
import { storiesOf } from '@storybook/react';
import UnbundlingAidTour from 'components/atoms/UnbundlingAidTour';
import GlobalVisualizationTour from 'components/atoms/GlobalVisualizationTour';
import GovernmentFinanceTour from 'components/atoms/GovernmentFinanceTour';
import Tour from '.';

storiesOf('Tour', module)
  .add('Global Viz tour', () =>
    (<Tour>
      <GlobalVisualizationTour />
    </Tour>),
  )
  .add('UnbundlindAid tour', () =>
    (<Tour>
      <UnbundlingAidTour />
    </Tour>),
  )
  .add('Government tour', () =>
    (<Tour visible>
      <GovernmentFinanceTour />
    </Tour>),
  )
;
