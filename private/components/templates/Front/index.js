// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container, Grid} from 'semantic-ui-react';
import type { Element } from 'react';
import Generic from '../Generic';
import Search from '../../molecules/Search';
import Slider from '../../molecules/YearSlider';
import ChartShare from '../../molecules/ChartShare';

type Props = {
  children?: Element<any>,
};

export default ({ children}: Props) => {
  return (
    <Generic pathName="/">
      <Search />
      <Container>
        <Grid centered>
          <Grid.Row centered>
            <Grid.Column width={4} textAlign="center">
              <Slider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4} textAlign="center">
              <ChartShare size="big" color="black" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Generic>
  );
};
