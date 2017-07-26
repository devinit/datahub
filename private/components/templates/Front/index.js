// @flow
import React from 'react';
import {Container, Grid, Header, Icon, Table} from 'semantic-ui-react';
import glamorous, {Div} from 'glamorous';
import GlobalPictureNavTabs from 'components/organisms/GlobalPictureNavTabs';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import NoSSR from 'react-no-ssr';
import {HeaderGroup} from 'components/atoms/Header';
import Map from 'components/organisms/Map';
import CountrySeachInput from 'components/organisms/CountrySearchInput';
import GlobalPictureCountrySeach from 'components/molecules/GlobalPictureCountrySearch';
import Generic from '../Generic';

type Props = {
  pathName: string;
}
export default (props: Props) => {
  return (
    <Generic>
      <GlobalPictureCountrySeach>
        <CountrySeachInput visible />
      </GlobalPictureCountrySeach>
      <Container>
        <Div paddingTop={'2em'} paddingBottom={'2em'} fontSize={'1.2rem'}>
          <Grid centered>
            <Grid.Column width={8} textAlign="center">
              <b><Icon name="pie graph" />The Development Data Hub </b> is the most comprehensive source for financial
              resource flow data alongside poverty, social and vulnerability indicators.
              Read more about the data hub.
            </Grid.Column>
          </Grid>
        </Div>
      </Container>
      <GlobalPictureNavTabs />
      <NoSSR><Map pathName={props.pathName} /></NoSSR>
    </Generic>
  );
};
