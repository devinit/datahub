// @flow
import React, {Component} from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { Div } from 'glamorous';
import GlobalPictureNavTabs from 'components/organisms/NavBarTabs/globalPicture';
import { MapBackground } from 'components/atoms/Backgrounds';
import CountrySearchInput from 'components/organisms/CountrySearchInput';
import GlobalPictureCountrySearch from 'components/molecules/GlobalPictureCountrySearch';
import dynamic from 'next/dynamic';
import { red } from 'components/theme/semantic';
import { cacheMapData } from 'lib/utils';
import type {StateToShare} from 'components/molecules/ChartShare';
import About from 'components/molecules/About';
import Generic from '../Generic';

/* eslint-disable max-len */
/* eslint-disable no-useless-constructor */
const DynamicMapComponent = dynamic(import('../../organisms/Map'), {
  ssr: false,
  loading: () => <MapBackground />,
});

type Props = {
  state: StateToShare
};
export default class Front extends Component {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    cacheMapData('/worker_gp.js');
  }
  render() {
    return (
      <Generic pathname="/">
        <GlobalPictureCountrySearch>
          <CountrySearchInput visible={false} profile={false} />
        </GlobalPictureCountrySearch>
        <Container>
          <Div paddingTop={'2em'} paddingBottom={'2em'} fontSize={'1.2rem'}>
            <Grid centered>
              <Grid.Column width={8} textAlign="center">
                <b>
                  <Icon name="pie graph" />The Development Data Hub{' '}
                </b>{' '}
                is the most comprehensive source for financial resource flow data alongside poverty,
                social and vulnerability indicators.{' '}
                <a href="#about" style={{color: red}}>Read more about the data hub.</a>
              </Grid.Column>
            </Grid>
          </Div>
        </Container>
        <div style={{ position: 'relative' }}>
          <GlobalPictureNavTabs state={this.props.state} />
          {process.env.NODE_ENV !== 'test' ?
            <DynamicMapComponent pathname="/" state={this.props.state} /> : ''
          }
        </div>
        <About />
      </Generic>
    );
  }
}
