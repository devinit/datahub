// @flow
import React from 'react';
import glamorous from 'glamorous';
import { Container, Button, Header, Grid } from 'semantic-ui-react';
import config from 'visboxConfigs/unbundlingTreemapChart';
import UnbundlingAid from 'components/organisms/UnbundlingAid';
import SocialMediaBar from 'components/molecules/SocialMediaBar';
import { RegularToolTip as Tooltip} from 'components/molecules/TabsToolTip';
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
  title: string,
  pathname: string,
  aidType: string,
};

// TODO: start year shouldnt be hardcoded @allan
export default class extends React.Component {
  state = { tourVisible: false, };
  showTour = () => {
    this.setState({
      tourVisible: true,
    });
  };
  props: Props;
  render() {
    const props = this.props;
    const aid = props.aidType === 'ODA' ? 'ODA' : 'OOFs';
    return (
      <Generic pathname={this.props.pathname}>
        <Container>
          <HeaderContainer>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <TopHeader>{props.title}</TopHeader>
                <Header.Subheader>
                  <BottomHeader>
                    Explore and compare funding priorities for official development assistance
                    <Tooltip
                      text={`Click the boxes to drill down into ${aid} bundle. Drag and drop the buttons below to change the order and take different journeys through the data. Use the ’Compare +’ button to see how different countries’ ${aid} bundles compare.`}
                    />
                    <Button
                      onClick={() => this.showTour()}
                      content="Using This Visualization"
                    />
                  </BottomHeader>
                </Header.Subheader>
              </Header.Content>
            </Header>
          </HeaderContainer>
        </Container>
        <UnbundlingAid
          tourVisible={this.state.tourVisible}
          aidType={props.aidType}
          startYear={props.aidType === 'oda' ? 2015 : 2013}
          config={config}
        />
        {process.env.NODE_ENV !== 'test' ?
          <section style={{paddingTop: '2em'}}><SocialMediaBar /></section> : '' }
        <TextContainer>
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width="10">
                  <Header as="h1">Source</Header>
                  <Header
                    as="h2"
                    style={{fontWeight: 100}}
                  >
                    Development Initiatives based on OECD DAC data.
                  </Header>
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
  }
}

// const mapStateToProps = ({ app: { rehydrated } }: State) => ({ rehydrated });
// const UnbundlingAidWithRedux = connect(mapStateToProps)(unbundlingAid);
// export default UnbundlingAidWithRedux;

