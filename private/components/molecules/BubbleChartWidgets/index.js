// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Grid, Container} from 'semantic-ui-react';
import BubbleSize from 'components/atoms/BubbleSizeDropDown';
import ColorBy from 'components/atoms/ColorBy';
import HighlightByIncomeGroup from 'components/atoms/HighlightByIncomeGroup';
import HighlightByRegions from 'components/atoms/HighlightRegions';
import SelectedCountries from 'components/atoms/SelectedCountries';
import data from './data';

export default class BubbleChartWidget extends React.Component {
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={12} tablet={12} mobile={16}>
              <div />
            </Grid.Column>
            <Grid.Column computer={4} tablet={4} mobile={16}>
              <BubbleSize options={data.bubbleSize} />
              <SelectedCountries placeholder="Select Country" onChange={() => {}} options={data.countries} />
              <ColorBy options={data.colorBy} />
              <HighlightByIncomeGroup options={data.highlightIncome} colorBy={false} />
              <HighlightByRegions options={data.highlightRegion} colorBy />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>);
  }
}
