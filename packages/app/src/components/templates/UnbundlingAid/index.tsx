import * as React from 'react';
import glamorous from 'glamorous';
import { Container, Button, Header, Grid, Icon } from 'semantic-ui-react';
import UnbundlingAid from '../../organisms/UnbundlingAid';
import SocialMediaBar from '@devinit/dh-ui/lib/molecules/SocialMediaBar';
import ToolTip from '@devinit/dh-ui/lib/molecules/ToolTip';
import Generic from '../Generic';

const headerStyles = {
  paddingTop: '4em',
  paddingBottom: '4em',
};
const HeaderContainer = glamorous.div(headerStyles);
const TopHeader = glamorous.div({
  fontSize: '1.4em',
  marginBottom: '0.5em',
});
const BottomHeader = glamorous.div({
  'fontSize': '1.4em',
  '& .button': {
    marginLeft: '1em',
  },
  '& i': {
    fontSize: '0.8em',
  },
});
const TextContainer = glamorous.div({
  marginTop: '2em',
  marginBottom: '2em',
});

interface Props  {
  title: string;
  pathname: string;
  aidType: string;
}

// TODO: start year shouldnt be hardcoded @allan
export default class extends React.Component<Props> {
  public state = { tourVisible: false };
  public showTour = () => {
    this.setState({
      tourVisible: true,
    });
  }
  public render() {
    const props = this.props;
    const aid = props.aidType === 'oda' ? 'ODA' : 'OOFs';
    return (
      <Generic pathname={this.props.pathname}>
        <Container>
          <HeaderContainer>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <TopHeader>{props.title}</TopHeader>
                <Header.Subheader>
                  <BottomHeader>
                    Explore and compare funding priorities for {}
                    {props.aidType === 'oda'
                      ? 'official development assistance'
                      : 'other official flows (OOFs)'}
                    <ToolTip color={'black'} trigger={<Icon name="info circle" />}>
                      {props.aidType === 'oda' ? (
                        ''
                      ) : (
                        <p style={{ marginBottom: '0.5em' }}>
                          The Other Official Flows (OOF) data shown does not include export credits
                          and the quality and completeness of data is reliant on the reporting of
                          OOF activities by individual donors to the CRS.
                        </p>
                      )}
                      Click the boxes to drill down into {aid} bundle. Drag and drop the buttons
                      below to change the order and take different journeys through the data. Use
                      the ’Compare +’ button to see how different countries’ {aid} bundles compare.
                    </ToolTip>
                    <Button onClick={this.showTour} content="Using This Visualization" />
                  </BottomHeader>
                </Header.Subheader>
              </Header.Content>
            </Header>
          </HeaderContainer>
        </Container>
        <UnbundlingAid
          tourVisible={this.state.tourVisible}
          aidType={props.aidType}
        />
        {process.env.NODE_ENV !== 'test' ? (
          <section style={{ paddingTop: '2em' }}>
            <SocialMediaBar />
          </section>
        ) : (
          ''
        )}
        <TextContainer>
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width="10">
                  <Header as="h1">Source</Header>
                  <Header as="h2" style={{ fontWeight: 100 }}>
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
