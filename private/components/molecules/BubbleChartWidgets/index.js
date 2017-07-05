import React from 'react';
import glamorous from 'glamorous';
import {Grid, Container} from 'semantic-ui-react';
import BubbleSize from 'components/atoms/BubbleSizeDropDown';
import ColorBy from 'components/atoms/ColorBy';
import HighlightByIncomeGroup from 'components/atoms/HighlightByIncomeGroup';
import HighlightByRegions from 'components/atoms/HighlightRegions';
import SelectedCountries from 'components/atoms/SelectedCountries';

export default class BubbleChartWidget {
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={12} tablet={12} mobile={16}>
              <div />
            </Grid.Column>
            <Grid.Column computer={4} tablet={4} mobile={16}>
              <BubbleSize />
              <SelectedCountries />
              <ColorBy />
              <HighlightByIncomeGroup />
              <HighlightByRegions />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>);
  }
}
