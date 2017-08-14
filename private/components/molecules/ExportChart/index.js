import { Grid, Button, Icon } from 'semantic-ui-react';
// import { lighterGrey} from 'components/theme/semantic';
import React from 'react';
import glamorous from 'glamorous';
import {lightSecondaryColor} from 'components/theme/semantic';
import ChartShare from '../ChartShare';


const Wrapper = glamorous.div({
  '& i': {
    fontSize: '1.48em'
  },
  '& .no-background:hover': {
    boxShadow: '0 1px 6px rgba(0,0,0,.3)'
  },
  '& .no-background': {
    backgroundColor: 'transparent !important',
    color: `${lightSecondaryColor} !important`,
  }
});
const ExportChart = () =>
  (<Wrapper>
    <Grid>
      <Grid.Row textAlign="right">
        <Grid.Column>
          <ChartShare className="no-background" color="grey" size="medium" />
          <Button className="no-background" size="medium"color="grey">
            <Icon name="print" />
          </Button>
          <Button size="medium" color="grey">
            Using this visualisation
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Wrapper>
  );

export default ExportChart;
