import {Grid, Button, Icon} from 'semantic-ui-react';
import React from 'react';
import ChartShare from '../ChartShare';

const ExportChart = () => (
  <Grid>
    <Grid.Row>
      <Grid width="12" verticalAlign="middle" textAlign="right">
        <ChartShare color="grey" size="medium" />
        <Button size="medium" color="grey">
          <Icon name="print" />
        </Button>
        <Button size="small">
          Using this visualisation
        </Button>
      </Grid>
    </Grid.Row>
  </Grid>
);

export default ExportChart;
