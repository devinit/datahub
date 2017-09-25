// @flow
import React from 'react';
import { Div } from 'glamorous';
import { Container, Grid, Icon} from 'semantic-ui-react';
import SpotLightNavTabs from 'components/organisms/NavBarTabs/spotlight';
import { MapBackground } from 'components/atoms/Backgrounds';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import About from 'components/molecules/About';
import type {StateToShare} from 'components/molecules/ChartShare';
import type { State } from 'lib/reducers';
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
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
const spotlight = (props: Props) => {
  return (
    <Generic pathname={props.pathname} >
      <Container>
        <Div paddingTop={'4em'} paddingBottom={'4em'}>
          <Grid centered>
            <Grid.Column width={12} textAlign="center">
              <b>
                <Icon name="pie graph" />Spotlight on Uganda {' '}
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
      <SpotLightNavTabs state={props.state} />
      {
        process.env.NODE_ENV !== 'test' ?
          <DynamicMapComponent pathname={props.pathname} state={props.state} /> : ''
      }
      <About />
    </Generic>
  );
};
const mapStateToProps = ({ app: { rehydrated } }: State) => ({ rehydrated });

const SpotLightWithRedux = connect(mapStateToProps)(spotlight);

export default SpotLightWithRedux;
