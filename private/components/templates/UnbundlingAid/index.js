// @flow
import React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid } from 'semantic-ui-react';
// import TotalODA from 'components/molecules/UnbundlingAidTotalODA';
import config from 'visboxConfigs/unbundlingTreemapChart';
import UnbundlingAid from 'components/organisms/UnbundlingAid';
import Social from 'components/molecules/UnbundlingAidSocial';
// import LoadingPlaceholder from 'components/molecules/LoadingPlaceholder';
// import { connect } from 'react-redux';
// import type { State } from 'lib/reducers';
import Generic from '../Generic';

const headerStyles = {
  paddingTop: '4em',
  paddingBottom: '4em',
};
const HeaderContainer = glamorous.div(headerStyles);

const TextContainer = glamorous.div({
  marginTop: '2em',
  marginBottom: '2em',
});
type Props = {
  // rehydrated: boolean,
  aidType: string
};

export default (props: Props) =>
  (
    <Generic>
      <Container>
        <HeaderContainer>
          <Header as="h1" textAlign="center">
            <Header.Content>
              Unbundling aid
              <Header.Subheader>
                Explore and compare funding priorities for official development assistance
              </Header.Subheader>
            </Header.Content>
          </Header>
        </HeaderContainer>
      </Container>
      {/* <TotalODA /> */}
      <UnbundlingAid aidType={props.aidType} startYear={2010} config={config} />
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

