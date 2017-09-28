// @flow
import React from 'react';
import glamorous from 'glamorous';
import { Container, Button, Header, Grid } from 'semantic-ui-react';
import config from 'visboxConfigs/unbundlingTreemapChart';
import UnbundlingAid from 'components/organisms/UnbundlingAid';
import Social from 'components/molecules/UnbundlingAidSocial';
import Tooltip from 'components/molecules/TabsToolTip';
// import LoadingPlaceholder from 'components/molecules/LoadingPlaceholder';
// import { connect } from 'react-redux';
// import type { State } from 'lib/reducers';
import Generic from '../Generic';

const headerStyles = {
  paddingTop: '4em',
  paddingBottom: '4em'
};
const HeaderContainer = glamorous.div(headerStyles);
const TopHeader = glamorous.div({
  fontSize: '1.4em',
  marginBottom: '0.5em',
});
const BottomHeader = glamorous.div({
  fontSize: '1.4em',
  '& .button': {
    marginLeft: '1em'
  },
  '& i': {
    fontSize: '0.8em'
  }
});
const TextContainer = glamorous.div({
  marginTop: '2em',
  marginBottom: '2em',
});
type Props = {
  // rehydrated: boolean,
  aidType: string
};

// TODO: start year shouldnt be hardcoded @allan
export default (props: Props) =>
  (
    <Generic pathname="/unbundling-aid">
      <Container>
        <HeaderContainer>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <TopHeader>Unbundling aid</TopHeader>
              <Header.Subheader>
                <BottomHeader>
                  Explore and compare funding priorities for official development assistance <Tooltip heading="Indicator heading" source="indicator source" /> <Button content="Using This Visualization" />
                </BottomHeader>
              </Header.Subheader>
            </Header.Content>
          </Header>
        </HeaderContainer>
      </Container>
      <UnbundlingAid aidType={props.aidType} startYear={props.aidType === 'oda' ? 2015 : 2013} config={config} />
      <Social />
      <TextContainer>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width="10">
                <Header as="h1">Source</Header>
                <Header as="h2">Development Initiatives based on OECD DAC data.</Header>
                <p>
                  Note that figures are rounded: precise data are available for download on the
                  methodology page
                </p>
              </Grid.Column>
              <Grid.Column width="6">
                <Header as="h1">Download the data</Header>
                <p>For more information, see the DI data hub methodology page</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </TextContainer>
    </Generic>
  );

// const mapStateToProps = ({ app: { rehydrated } }: State) => ({ rehydrated });
// const UnbundlingAidWithRedux = connect(mapStateToProps)(unbundlingAid);
// export default UnbundlingAidWithRedux;

