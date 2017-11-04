// @flow
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Div } from 'glamorous';
import { Container, Grid, Icon} from 'semantic-ui-react';
import SpotLightNavTabs from 'components/organisms/NavBarTabs/spotlight';
import { MapBackground } from 'components/atoms/Backgrounds';
import dynamic from 'next/dynamic';
import About from 'components/molecules/About';
import { cacheMapData } from 'lib/utils';
import type {StateToShare} from 'components/molecules/ChartShare';
import Generic from '../Generic';

const DynamicMapComponent = dynamic(
  import('components/organisms/Map'), {
    ssr: false,
    loading: () => <MapBackground />
  });

type Props = {
  pathname: string,
  state: StateToShare
  // rehydrated: boolean,
};
export default class Spotlight extends Component {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    cacheMapData('/worker_ug.js');
  }
  render() {
    return (
      <Generic pathname={this.props.pathname} >
        <Container>
          <Div paddingTop={'4em'} paddingBottom={'4em'}>
            <Grid centered>
              <Grid.Column width={12} textAlign="center">
                <b>
                  <Icon name="pie graph" /> Spotlight on Uganda {' '}
                </b>
                is a comprehensive source of Uganda's financial resource flow data at the
                sub-national (district) level, alongside indicators on poverty, population, education,
                health, water, hygiene and sanitation. It highlights the geographical variance in
                sector performance and financial resources, and seeks to answer whether resources are
                allocated according to need. Explore the country picture by selecting topics and click
                on a district for an in-depth profile.
              </Grid.Column>
            </Grid>
          </Div>
        </Container>
        <SpotLightNavTabs state={this.props.state} />
        {
          process.env.NODE_ENV !== 'test' ?
            <DynamicMapComponent pathname={this.props.pathname} state={this.props.state} /> : ''
        }
        <About />
      </Generic>
    );
  }
}
