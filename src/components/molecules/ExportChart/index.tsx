import glamorous from 'glamorous';
import * as React from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import { printDiv as print } from '../../../utils';
import ChartShare, { NoBackground, StateToShare } from '../ChartShare';
import { Intro } from '../../atoms/Intro';
import { howTo } from '../../../utils/howTo';

export type ViewFn = () => void;

export interface Props {
  printDiv?: string;
  onViewVisualization?: ViewFn;
  stateToShare?: StateToShare; // state to serialise
}

const Wrapper = glamorous.div({
  '& i': {
    fontSize: '1.48em'
  },
  ...NoBackground
});

const onPrintClick = (divElem: string) => () => print(divElem);

const shouldVisualise = (onViewVisualization?: ViewFn) =>
  () => onViewVisualization ? onViewVisualization() : null;

const ExportChart = ({ printDiv, stateToShare, onViewVisualization }: Props) =>
  <Wrapper>
    <Grid>
      <Grid.Row textAlign="right">
        <Grid.Column>
          <Intro step={ 6 } intro={ howTo.countryProfile.governmentFinance.share } span>
            <ChartShare
              className="no-background"
              label="Share"
              color="grey"
              stateToShare={ stateToShare }
              size="medium"
              fontWeight={ 100 }
            />
          </Intro>
          {
            printDiv
              ?
              <Button onClick={ onPrintClick(printDiv) } className="no-background" size="medium"color="grey">
                <Icon name="print" />
              </Button>
              : ''
          }
          <Button size="medium" color="grey" onClick={ shouldVisualise(onViewVisualization) }>
            Using this visualisation
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Wrapper>;

export default ExportChart;
