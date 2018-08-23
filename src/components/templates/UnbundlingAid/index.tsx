import glamorous from 'glamorous';
import * as React from 'react';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';
import ErrorBoundary from '../../molecules/ErrorBoundary';
import SocialMediaBar from '../../molecules/SocialMediaBar';
import { ToolTip } from '../../molecules/ToolTip';
import UnbundlingAid from '../../organisms/UnbundlingAid';
import { getUnbundlingAidPageData } from '../../pageData';
import pageData from '../../pageData/data';
import Generic from '../Generic';

const headerStyles = {
  paddingTop: '4em',
  paddingBottom: '4em'
};
const HeaderContainer = glamorous.div(headerStyles);
const TopHeader = glamorous.div({
  fontSize: '1.4em',
  marginBottom: '0.5em'
});
const BottomHeader = glamorous.div({
  'fontSize': '1.4em',
  '& .button': {
    marginLeft: '1em'
  },
  '& i': {
    fontSize: '0.8em'
  }
});
const TextContainer = glamorous.div({
  marginTop: '2em',
  marginBottom: '2em'
});

interface Props {
  title: string;
  pathname: string;
  aidType: string;
}

// TODO: start year shouldnt be hardcoded @allan
export default class extends React.Component<Props> {
  public state = { tourVisible: false };

  render() {
    const props = this.props;

    return (
      <Generic>
        <Container>
          <HeaderContainer>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <TopHeader>{ props.title }</TopHeader>
                <Header.Subheader>
                  <ErrorBoundary>
                    <BottomHeader>
                      Explore and compare funding priorities for { }
                      { props.aidType === 'oda' ? 'official development assistance' : 'other official flows (OOFs)' }
                      <ToolTip color={ 'black' } trigger={ <Icon name="info circle" /> }>
                        {
                          props.aidType === 'oda'
                            ? ''
                            :
                            <p style={ { marginBottom: '0.5em' } }>
                              { pageData.unbundlingAid[1].narrative }
                            </p>
                        }
                        { getUnbundlingAidPageData(props.aidType) }
                      </ToolTip>
                      <Button onClick={ this.showTour } content="Using This Visualization" />
                    </BottomHeader>
                  </ErrorBoundary>
                </Header.Subheader>
              </Header.Content>
            </Header>
          </HeaderContainer>
        </Container>
        <UnbundlingAid
          tourVisible={ this.state.tourVisible }
          aidType={ props.aidType }
        />
        {
          process.env.NODE_ENV !== 'test'
            ?
            <section style={ { paddingTop: '2em' } }>
              <SocialMediaBar />
            </section>
            : ''
        }
        <TextContainer>
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width="10">
                  <Header as="h1">Source</Header>
                  <Header as="h2" style={ { fontWeight: 100 } }>
                      { pageData.unbundlingAid[3].title }
                  </Header>
                  <p>
                    { pageData.unbundlingAid[4].narrative }
                  </p>
                </Grid.Column>
                <Grid.Column width="6">
                  <Header as="h1">{ pageData.unbundlingAid[5].title }</Header>
                  <p>{ pageData.unbundlingAid[6].narrative }</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </TextContainer>
      </Generic>
    );
  }

  private showTour = () => {
    this.setState({
      tourVisible: true
    });
  }
}
