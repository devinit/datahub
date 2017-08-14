import { Grid, Button, Icon } from 'semantic-ui-react';
// import { lighterGrey} from 'components/theme/semantic';
import React from 'react';
import ChartShare from '../ChartShare';

const ExportChart = () =>
  (<Grid>
    <Grid.Row textAlign="right">
      <Grid.Column>
        <ChartShare color="grey" size="medium" />
        <Button size="medium"color="grey">
          <Icon name="print" />
        </Button>
        <Button size="medium" color="grey">
          Using this visualisation
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>);

export default ExportChart;
